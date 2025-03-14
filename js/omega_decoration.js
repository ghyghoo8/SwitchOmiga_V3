(function(){var orderForType;orderForType={FixedProfile:-2e3,PacProfile:-1e3,VirtualProfile:1e3,SwitchProfile:2e3,RuleListProfile:3e3},angular.module("omegaDecoration",[]).value("profileIcons",{DirectProfile:"glyphicon-transfer",SystemProfile:"glyphicon-off",AutoDetectProfile:"glyphicon-file",FixedProfile:"glyphicon-globe",PacProfile:"glyphicon-file",VirtualProfile:"glyphicon-question-sign",RuleListProfile:"glyphicon-list",SwitchProfile:"glyphicon-retweet"}).constant("profileOrder",(function(a,b){var diff;return 0!==(diff=(0|orderForType[a.profileType])-(0|orderForType[b.profileType]))?diff:a.name===b.name?0:a.name<b.name?-1:1})).constant("getVirtualTarget",(function(profile,options){if("VirtualProfile"===(null!=profile?profile.profileType:void 0))return null!=options?options["+"+profile.defaultProfileName]:void 0})).directive("omegaProfileIcon",(function(profileIcons,getVirtualTarget){return{restrict:"A",template:'<span ng-style="{color: color || getColor(profile)}"\n  ng-class="{\'virtual-profile-icon\': isVirtual(profile)}"\n  class="glyphicon {{icon || getIcon(profile)}}">\n</span>',scope:{profile:"=?omegaProfileIcon",icon:"=?icon",color:"=?color",options:"=options"},link:function(scope,element,attrs,ngModel){return scope.profileIcons=profileIcons,scope.isVirtual=function(profile){return"VirtualProfile"===(null!=profile?profile.profileType:void 0)},scope.getIcon=function(profile){var type,_ref,_ref1;return type=null!=profile?profile.profileType:void 0,type=null!=(_ref=null!=(_ref1=getVirtualTarget(profile,scope.options))?_ref1.profileType:void 0)?_ref:type,profileIcons[type]},scope.getColor=function(profile){var color;for(color=void 0;profile;)color=profile.color,profile=getVirtualTarget(profile,scope.options);return color}}}})).directive("omegaProfileInline",(function(){return{restrict:"A",template:'<span omega-profile-icon="profile" options="options"></span>\n{{dispName ? dispName(profile) : profile.name}}',scope:{profile:"=omegaProfileInline",dispName:"=?dispName",options:"=options"}}})).directive("omegaHtml",(function($compile){return{restrict:"A",link:function(scope,element,attrs,ngModel){var getHtml,locals;return locals={$profile:function(profile,dispName,options){return null==profile&&(profile="profile"),null==dispName&&(dispName="dispNameFilter"),null==options&&(options="options"),'<span class="profile-inline" omega-profile-inline="'+profile+'"\n  disp-name="'+dispName+'" options="'+options+'"></span>'}},getHtml=function(){return scope.$eval(attrs.omegaHtml,locals)},scope.$watch(getHtml,(function(html){return element.html(html),$compile(element.contents())(scope)}))}}})).directive("omegaProfileSelect",(function($timeout,profileIcons){return{restrict:"A",templateUrl:"partials/omega_profile_select.html",require:"?ngModel",scope:{profiles:"&omegaProfileSelect",defaultText:"@?defaultText",dispName:"=?dispName",options:"=options"},link:function(scope,element,attrs,ngModel){var updateView;return scope.profileIcons=profileIcons,scope.currentProfiles=[],scope.dispProfiles=void 0,updateView=function(){var profile,_i,_len,_ref,_results;for(scope.profileIcon="",_results=[],_i=0,_len=(_ref=scope.currentProfiles).length;_i<_len;_i++){if((profile=_ref[_i]).name===scope.profileName){scope.selectedProfile=profile,scope.profileIcon=profileIcons[profile.profileType];break}_results.push(void 0)}return _results},scope.$watch(scope.profiles,(function(profiles){return scope.currentProfiles=profiles||[],null!=scope.dispProfiles&&(scope.dispProfiles=currentProfiles),updateView()}),!0),scope.toggled=function(open){if(open&&null==scope.dispProfiles)return scope.dispProfiles=scope.currentProfiles,scope.toggled=void 0},ngModel&&(ngModel.$render=function(){return scope.profileName=ngModel.$viewValue,updateView()}),scope.setProfileName=function(name){if(ngModel)return ngModel.$setViewValue(name),ngModel.$render()},scope.getName=function(profile){if(profile)return scope.dispName(profile)||profile.name}}}}))}).call(this);