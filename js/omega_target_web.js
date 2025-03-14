(function(){var __slice=[].slice,__hasProp={}.hasOwnProperty;angular.module("omegaTarget",[]).factory("omegaTarget",(function($q){var callBackground,callBackgroundNoReply,connectBackground,decodeError,isChromeUrl,omegaTarget,optionsChangeCallback,prefix,requestInfoCallback,urlParser;return decodeError=function(obj){var err;return"error"===obj._error?((err=new Error(obj.message)).name=obj.name,err.stack=obj.stack,err.original=obj.original,err):obj},callBackgroundNoReply=function(){var args,method;return method=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[],chrome.runtime.sendMessage({method:method,args:args,noReply:!0})},callBackground=function(){var args,d,method;return method=arguments[0],args=2<=arguments.length?__slice.call(arguments,1):[],d=$q.defer(),chrome.runtime.sendMessage({method:method,args:args},(function(response){if(null==chrome.runtime.lastError)return response.error?d.reject(decodeError(response.error)):d.resolve(response.result);d.reject(chrome.runtime.lastError)})),d.promise},connectBackground=function(name,message,callback){var onDisconnect,port;port=chrome.runtime.connect({name:name}),onDisconnect=function(){return port.onDisconnect.removeListener(onDisconnect),port.onMessage.removeListener(callback)},port.onDisconnect.addListener(onDisconnect),port.postMessage(message),port.onMessage.addListener(callback)},isChromeUrl=function(url){return"chrome"===url.substr(0,6)||"moz-"===url.substr(0,4)||"about:"===url.substr(0,6)},optionsChangeCallback=[],requestInfoCallback=null,prefix="omega.local.",urlParser=document.createElement("a"),omegaTarget={options:null,state:function(name,value){var d,newItem;return d=$q.defer(),1===arguments.length?Array.isArray(name)?callBackground("getState",name).then((function(values){return d.resolve(name.map((function(key){return values[key]})))})):callBackground("getState",[name]).then((function(values){return d.resolve(values[name])})):((newItem={})[name]=value,callBackground("setState",newItem).then((function(){return d.resolve(value)}))),d.promise},lastUrl:function(url){var name;if(name="web.last_url",url)return localStorage[prefix+name]=url,url;try{return JSON.parse(localStorage[prefix+name])}catch(_error){}},addOptionsChangeCallback:function(callback){return optionsChangeCallback.push(callback)},refresh:function(args){return callBackground("getAll").then((function(opt){var _i,_len;for(omegaTarget.options=opt,_i=0,_len=optionsChangeCallback.length;_i<_len;_i++)(0,optionsChangeCallback[_i])(omegaTarget.options);return args}))},renameProfile:function(fromName,toName){return callBackground("renameProfile",fromName,toName).then(omegaTarget.refresh)},replaceRef:function(fromName,toName){return callBackground("replaceRef",fromName,toName).then(omegaTarget.refresh)},optionsPatch:function(patch){return callBackground("patch",patch).then(omegaTarget.refresh)},resetOptions:function(opt){return callBackground("reset",opt).then(omegaTarget.refresh)},updateProfile:function(name,opt_bypass_cache){return callBackground("updateProfile",name,opt_bypass_cache).then((function(results){var key,value;for(key in results)__hasProp.call(results,key)&&(value=results[key],results[key]=decodeError(value));return results})).then(omegaTarget.refresh)},getMessage:chrome.i18n.getMessage.bind(chrome.i18n),openOptions:function(hash){var d,options_url;return d=$q.defer(),options_url=chrome.runtime.getURL("options.html"),chrome.tabs.query({url:options_url},(function(tabs){var props,url,_ref;return url=hash?(urlParser.href=(null!=(_ref=tabs[0])?_ref.url:void 0)||options_url,urlParser.hash=hash,urlParser.href):options_url,tabs.length>0?(props={active:!0},hash&&(props.url=url),chrome.tabs.update(tabs[0].id,props)):chrome.tabs.create({url:url}),d.resolve()})),d.promise},applyProfile:function(name){return callBackground("applyProfile",name)},applyProfileNoReply:function(name){return callBackgroundNoReply("applyProfile",name)},addTempRule:function(domain,profileName,toggle){return callBackground("addTempRule",domain,profileName,toggle)},addCondition:function(condition,profileName){return callBackground("addCondition",condition,profileName)},addProfile:function(profile){return callBackground("addProfile",profile).then(omegaTarget.refresh)},setDefaultProfile:function(profileName,defaultProfileName){return callBackground("setDefaultProfile",profileName,defaultProfileName)},getActivePageInfo:function(){var d;return!0,d=$q.defer(),chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(tabs){var args;if(0!==tabs.length&&(tabs[0].pendingUrl||tabs[0].url))return args={tabId:tabs[0].id,url:tabs[0].pendingUrl||tabs[0].url},tabs[0].id&&requestInfoCallback&&connectBackground("tabRequestInfo",args,requestInfoCallback),d.resolve(callBackground("getPageInfo",args));d.resolve(null)})),d.promise.then((function(info){return(null!=info?info.url:void 0)?info:null}))},refreshActivePage:function(){var d;return d=$q.defer(),chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(tabs){var url;return(url=tabs[0].pendingUrl||tabs[0].url)&&!isChromeUrl(url)&&(tabs[0].pendingUrl?chrome.tabs.update(tabs[0].id,{url:url}):chrome.tabs.reload(tabs[0].id,{bypassCache:!0})),d.resolve()})),d.promise},openManage:function(){return chrome.tabs.create({url:"chrome://extensions/?id="+chrome.runtime.id})},openShortcutConfig:function(){return chrome.tabs.create({url:"chrome://extensions/configureCommands"})},setOptionsSync:function(enabled,args){return callBackground("setOptionsSync",enabled,args)},resetOptionsSync:function(args){return callBackground("resetOptionsSync",args)},checkOptionsSyncChange:function(){return callBackground("checkOptionsSyncChange")},setRequestInfoCallback:function(callback){return requestInfoCallback=callback}},omegaTarget}))}).call(this);