(function(){$script("lib/tether/tether.js",(function(){return $script("lib/shepherd.js/shepherd.min.js",(function(){var targetAnchorClick,tour,tr;return tr=chrome.i18n.getMessage.bind(chrome.i18n),targetAnchorClick={selector:".shepherd-target a",event:"click"},(tour=new Shepherd.Tour({defaults:{classes:"shepherd-theme-arrows",scrollTo:!0}})).addStep("fixed-profile-step",{text:tr("options_guide_fixedProfileStep"),attachTo:'.nav-profile[data-profile-type="FixedProfile"] right',scrollTo:!1,advanceOn:targetAnchorClick,buttons:[{text:tr("options_guideNext"),action:tour.next}]}),tour.addStep("fixed-servers-step",{text:tr("options_guide_fixedServersStep"),attachTo:".fixed-servers top",scrollTo:!1,buttons:[{text:tr("options_guideNext"),action:tour.next}]}),tour.addStep("auto-switch-profile-step",{text:tr("options_guide_autoSwitchProfileStep"),attachTo:'.nav-profile[data-profile-type="SwitchProfile"] right',scrollTo:!1,advanceOn:targetAnchorClick,buttons:[{text:tr("options_guideNext"),action:tour.next}]}),tour.addStep("add-more-profiles-step",{text:tr("options_guide_addMoreProfilesStep"),attachTo:".nav-new-profile right",scrollTo:!1,advanceOn:targetAnchorClick,buttons:[{text:tr("options_guideDone"),action:tour.next}]}),tour.start()}))}))}).call(this);