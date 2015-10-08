﻿CKEDITOR.dialog.add("scaytDialog",function(d){var e=d.scayt,n='<p><img src="'+e.getLogo()+'" /></p><p>'+e.getLocal("version")+e.getVersion()+"</p><p>"+e.getLocal("text_copyrights")+"</p>",o=CKEDITOR.document,l={isChanged:function(){return null===this.newLang||this.currentLang===this.newLang?!1:!0},currentLang:e.getLang(),newLang:null,reset:function(){this.currentLang=e.getLang();this.newLang=null},id:"lang"},n=[{id:"options",label:e.getLocal("tab_options"),onShow:function(){},elements:[{type:"vbox",
id:"scaytOptions",children:function(){var a=e.getApplicationConfig(),b=[],f={"ignore-all-caps-words":"label_allCaps","ignore-domain-names":"label_ignoreDomainNames","ignore-words-with-mixed-cases":"label_mixedCase","ignore-words-with-numbers":"label_mixedWithDigits"},g;for(g in a){var c={type:"checkbox"};c.id=g;c.label=e.getLocal(f[g]);b.push(c)}return b}(),onShow:function(){this.getChild();for(var a=d.scayt,b=0;b<this.getChild().length;b++)this.getChild()[b].setValue(a.getApplicationConfig()[this.getChild()[b].id])}}]},
{id:"langs",label:e.getLocal("tab_languages"),elements:[{id:"leftLangColumn",type:"vbox",align:"left",widths:["100"],children:[{type:"html",id:"langBox",style:"overflow: hidden; white-space: normal;margin-bottom:15px;",html:'<div><div style="float:left;width:45%;margin-left:5px;" id="left-col-'+d.name+'"></div><div style="float:left;width:45%;margin-left:15px;" id="right-col-'+d.name+'"></div></div>',onShow:function(){var a=d.scayt.getLang();o.getById("scaytLang_"+a).$.checked=!0}},{type:"html",id:"graytLanguagesHint",
html:'<div style="margin:5px auto; width:95%;white-space:normal;" id="'+d.name+'graytLanguagesHint"><span style="width:10px;height:10px;display: inline-block; background:#02b620;vertical-align:top;margin-top:2px;"></span> - This languages are supported by Grammar As You Type(GRAYT).</div>',onShow:function(){var a=o.getById(d.name+"graytLanguagesHint");d.config.grayt_autoStartup||(a.$.style.display="none")}}]}]},{id:"dictionaries",label:e.getLocal("tab_dictionaries"),elements:[{type:"vbox",id:"rightCol_col__left",
children:[{type:"html",id:"dictionaryNote",html:""},{type:"text",id:"dictionaryName",label:e.getLocal("label_fieldNameDic")||"Dictionary name",onShow:function(a){var b=a.sender,f=d.scayt;setTimeout(function(){b.getContentElement("dictionaries","dictionaryNote").getElement().setText("");null!=f.getUserDictionaryName()&&""!=f.getUserDictionaryName()&&b.getContentElement("dictionaries","dictionaryName").setValue(f.getUserDictionaryName())},0)}},{type:"hbox",id:"notExistDic",align:"left",style:"width:auto;",
widths:["50%","50%"],children:[{type:"button",id:"createDic",label:e.getLocal("btn_createDic"),title:e.getLocal("btn_createDic"),onClick:function(){var a=this.getDialog(),b=m,f=d.scayt,g=a.getContentElement("dictionaries","dictionaryName").getValue();f.createUserDictionary(g,function(c){c.error||b.toggleDictionaryButtons.call(a,!0);c.dialog=a;c.command="create";c.name=g;d.fire("scaytUserDictionaryAction",c)},function(c){c.dialog=a;c.command="create";c.name=g;d.fire("scaytUserDictionaryActionError",
c)})}},{type:"button",id:"restoreDic",label:e.getLocal("btn_restoreDic"),title:e.getLocal("btn_restoreDic"),onClick:function(){var a=this.getDialog(),b=d.scayt,f=m,g=a.getContentElement("dictionaries","dictionaryName").getValue();b.restoreUserDictionary(g,function(c){c.dialog=a;c.error||f.toggleDictionaryButtons.call(a,!0);c.command="restore";c.name=g;d.fire("scaytUserDictionaryAction",c)},function(c){c.dialog=a;c.command="restore";c.name=g;d.fire("scaytUserDictionaryActionError",c)})}}]},{type:"hbox",
id:"existDic",align:"left",style:"width:auto;",widths:["50%","50%"],children:[{type:"button",id:"removeDic",label:e.getLocal("btn_deleteDic"),title:e.getLocal("btn_deleteDic"),onClick:function(){var a=this.getDialog(),b=d.scayt,f=m,g=a.getContentElement("dictionaries","dictionaryName"),c=g.getValue();b.removeUserDictionary(c,function(b){g.setValue("");b.error||f.toggleDictionaryButtons.call(a,!1);b.dialog=a;b.command="remove";b.name=c;d.fire("scaytUserDictionaryAction",b)},function(b){b.dialog=a;
b.command="remove";b.name=c;d.fire("scaytUserDictionaryActionError",b)})}},{type:"button",id:"renameDic",label:e.getLocal("btn_renameDic"),title:e.getLocal("btn_renameDic"),onClick:function(){var a=this.getDialog(),b=d.scayt,f=a.getContentElement("dictionaries","dictionaryName").getValue();b.renameUserDictionary(f,function(b){b.dialog=a;b.command="rename";b.name=f;d.fire("scaytUserDictionaryAction",b)},function(b){b.dialog=a;b.command="rename";b.name=f;d.fire("scaytUserDictionaryActionError",b)})}}]},
{type:"html",id:"dicInfo",html:'<div id="dic_info_editor1" style="margin:5px auto; width:95%;white-space:normal;">'+e.getLocal("text_descriptionDic")+"</div>"}]}]},{id:"about",label:e.getLocal("tab_about"),elements:[{type:"html",id:"about",style:"margin: 5px 5px;",html:'<div><div id="scayt_about_">'+n+"</div></div>"}]}];d.on("scaytUserDictionaryAction",function(a){var b=SCAYT.prototype.UILib,f=a.data.dialog,g=f.getContentElement("dictionaries","dictionaryNote").getElement(),c=a.editor.scayt,d;void 0===
a.data.error?(d=c.getLocal("message_success_"+a.data.command+"Dic"),d=d.replace("%s",a.data.name),g.setText(d),b.css(g.$,{color:"blue"})):(""===a.data.name?g.setText(c.getLocal("message_info_emptyDic")):(d=c.getLocal("message_error_"+a.data.command+"Dic"),d=d.replace("%s",a.data.name),g.setText(d)),b.css(g.$,{color:"red"}),null!=c.getUserDictionaryName()&&""!=c.getUserDictionaryName()?f.getContentElement("dictionaries","dictionaryName").setValue(c.getUserDictionaryName()):f.getContentElement("dictionaries",
"dictionaryName").setValue(""))});d.on("scaytUserDictionaryActionError",function(a){var b=SCAYT.prototype.UILib,f=a.data.dialog,d=f.getContentElement("dictionaries","dictionaryNote").getElement(),c=a.editor.scayt,e;""===a.data.name?d.setText(c.getLocal("message_info_emptyDic")):(e=c.getLocal("message_error_"+a.data.command+"Dic"),e=e.replace("%s",a.data.name),d.setText(e));b.css(d.$,{color:"red"});null!=c.getUserDictionaryName()&&""!=c.getUserDictionaryName()?f.getContentElement("dictionaries","dictionaryName").setValue(c.getUserDictionaryName()):
f.getContentElement("dictionaries","dictionaryName").setValue("")});var m={title:e.getLocal("text_title"),resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:340,minHeight:260,onLoad:function(){if(0!=d.config.scayt_uiTabs[1]){var a=m,b=a.getLangBoxes.call(this);b.getParent().setStyle("white-space","normal");a.renderLangList(b);this.definition.minWidth=this.getSize().width;this.resize(this.definition.minWidth,this.definition.minHeight)}},onCancel:function(){l.reset()},onHide:function(){d.unlockSelection()},
onShow:function(){d.fire("scaytDialogShown",this);if(0!=d.config.scayt_uiTabs[2]){var a=d.scayt,b=this.getContentElement("dictionaries","dictionaryName"),f=this.getContentElement("dictionaries","existDic").getElement().getParent(),g=this.getContentElement("dictionaries","notExistDic").getElement().getParent();f.hide();g.hide();null!=a.getUserDictionaryName()&&""!=a.getUserDictionaryName()?(this.getContentElement("dictionaries","dictionaryName").setValue(a.getUserDictionaryName()),f.show()):(b.setValue(""),
g.show())}},onOk:function(){var a=m,b=d.scayt;this.getContentElement("options","scaytOptions");a=a.getChangedOption.call(this);b.commitOption({changedOptions:a})},toggleDictionaryButtons:function(a){var b=this.getContentElement("dictionaries","existDic").getElement().getParent(),d=this.getContentElement("dictionaries","notExistDic").getElement().getParent();a?(b.show(),d.hide()):(b.hide(),d.show())},getChangedOption:function(){var a={};if(1==d.config.scayt_uiTabs[0])for(var b=this.getContentElement("options",
"scaytOptions").getChild(),f=0;f<b.length;f++)b[f].isChanged()&&(a[b[f].id]=b[f].getValue());l.isChanged()&&(a[l.id]=d.config.scayt_sLang=l.currentLang=l.newLang);return a},buildRadioInputs:function(a,b,f){var g=new CKEDITOR.dom.element("div"),c="scaytLang_"+b,e=CKEDITOR.dom.element.createFromHtml('<input id="'+c+'" type="radio"  value="'+b+'" name="scayt_lang" />'),k=new CKEDITOR.dom.element("label"),i=d.scayt;g.setStyles({"white-space":"normal",position:"relative","padding-bottom":"2px"});e.on("click",
function(a){l.newLang=a.sender.getValue()});k.appendText(a);k.setAttribute("for",c);f&&d.config.grayt_autoStartup&&k.setStyles({color:"#02b620"});g.append(e);g.append(k);b===i.getLang()&&(e.setAttribute("checked",!0),e.setAttribute("defaultChecked","defaultChecked"));return g},renderLangList:function(a){var b=a.find("#left-col-"+d.name).getItem(0),a=a.find("#right-col-"+d.name).getItem(0),f=e.getScaytLangList(),g=e.getGraytLangList(),c={},j=[],k=0,i=!1,h;for(h in f.ltr)c[h]=f.ltr[h];for(h in f.rtl)c[h]=
f.rtl[h];for(h in c)j.push([h,c[h]]);j.sort(function(a,b){var c=0;a[1]>b[1]?c=1:a[1]<b[1]&&(c=-1);return c});c={};for(i=0;i<j.length;i++)c[j[i][0]]=j[i][1];j=Math.round(j.length/2);for(h in c)k++,i=h in g.ltr||h in g.rtl,this.buildRadioInputs(c[h],h,i).appendTo(k<=j?b:a)},getLangBoxes:function(){return this.getContentElement("langs","langBox").getElement()},contents:function(a,b){var d=[],e=b.config.scayt_uiTabs;if(e){for(var c in e)1==e[c]&&d.push(a[c]);d.push(a[a.length-1])}else return a;return d}(n,
d)};return m});