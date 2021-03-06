import collections

from django.conf import settings
from django.contrib.auth import get_user_model

from kuma.core.jobs import KumaJob, GenerationJob
from kuma.users.templatetags.jinja_helpers import gravatar_url


class DocumentNearestZoneJob(KumaJob):
    lifetime = 60 * 60 * 29
    refresh_timeout = 60

    def fetch(self, pk):
        """
        Find the nearest DocumentZone, if there is one, starting from this
        document and going upwards via topic parents.
        """
        from .models import Document, DocumentZone

        # Using "admin_objects" here to get around the
        # filter that excludes deleted documents.
        get_parent_id = (Document.admin_objects
                                 .values_list('parent_topic', flat=True)
                                 .get)
        while pk:
            try:
                return DocumentZone.objects.get(document=pk)
            except DocumentZone.DoesNotExist:
                pk = get_parent_id(pk=pk)

        return self.empty()


class DocumentZoneURLRemapsJob(KumaJob):
    lifetime = 60 * 60 * 3
    refresh_timeout = 60

    def fetch(self, locale):
        from .models import DocumentZone
        zones = (DocumentZone.objects.filter(document__locale=locale,
                                             url_root__isnull=False)
                                     .exclude(url_root=''))
        remaps = [('/docs/%s' % zone.document.slug, '/%s' % zone.url_root)
                  for zone in zones]
        return remaps

    def empty(self):
        # the empty result needs to be an empty list instead of None
        return []


class DocumentContributorsJob(KumaJob):
    """
    Given a wiki document returns a list of contributors that have recently
    authored revisions.

    We invalidate this when a document is saved only, not when a user account
    changes given the potential of lots of documents needing to be updated
    everytime a profile is saved. Instead we accept that some contributor links
    may be wrong until the cache item's lifetime runs out for this edge case.
    """
    lifetime = 60 * 60 * 12
    refresh_timeout = 30
    version = 2
    # Don't synchronously fetch the contributor bar but schedule a fetch
    fetch_on_miss = False

    def get(self, *args, **kwargs):
        if settings.MAINTENANCE_MODE:
            return self.empty()
        return super(DocumentContributorsJob, self).get(*args, **kwargs)

    def fetch(self, pk):
        from .models import Document
        User = get_user_model()

        # first get a list of user ID recently authoring revisions
        document = Document.objects.get(pk=pk)
        recent_creator_ids = (document.revisions.order_by('-created')
                                                .values_list('creator_id',
                                                             flat=True))

        if not recent_creator_ids:
            return self.empty()

        # then return the ordered results given the ID list, MySQL only syntax
        select = collections.OrderedDict([
            ('ordered_ids',
             'FIELD(id,%s)' % ','.join(map(str, recent_creator_ids))),
        ])
        contributors = list(User.objects.filter(id__in=list(recent_creator_ids),
                                                is_active=True)
                                        .extra(select=select,
                                               order_by=['ordered_ids'])
                                        .values('id', 'username', 'email'))
        result = []
        for contributor in contributors:
            contributor['gravatar_34'] = gravatar_url(contributor['email'],
                                                      size=34)
            result.append(contributor)
        return result

    def empty(self):
        # the empty result needs to be an empty list instead of None
        return []


class DocumentCodeSampleJob(GenerationJob):
    lifetime = 60 * 60 * 12
    refresh_timeout = 60

    def fetch(self, pk, sample_name):
        from .models import Document
        document = Document.objects.get(pk=pk)
        return document.extract.code_sample(sample_name)

    def empty(self):
        return {}
