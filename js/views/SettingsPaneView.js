'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
	CAbstractSettingsFormView = ModulesManager.run('SettingsWebclient', 'getAbstractSettingsFormViewClass'),
	
	Settings = require('modules/%ModuleName%/js/Settings.js')
;

/**
 * Inherits from CAbstractSettingsFormView that has methods for showing and hiding settings tab,
 * updating settings values on the server, checking if there was changins on the settings page.
 * 
 * @constructor
 */
function CSettingsPaneView()
{
	CAbstractSettingsFormView.call(this, Settings.ServerModuleName);

	this.enableModule = ko.observable(Settings.enableModule());
	this.enablePreviewPane = ko.observable(Settings.enablePreviewPane());
}

_.extendOwn(CSettingsPaneView.prototype, CAbstractSettingsFormView.prototype);

/**
 * Name of template that will be bound to this JS-object.
 * 'SettingsPaneView' - name of template file in 'templates' folder.
 */
CSettingsPaneView.prototype.ViewTemplate = '%ModuleName%_SettingsPaneView';

/**
 * Returns array with all settings values wich is used for indicating if there were changes on the page.
 * 
 * @returns {Array} Array with all settings values;
 */
CSettingsPaneView.prototype.getCurrentValues = function ()
{
	return [
		this.enableModule(),
		this.enablePreviewPane()
	];
};

/**
 * Reverts all settings values to global ones.
 */
CSettingsPaneView.prototype.revertGlobalValues = function ()
{
	this.enableModule(Settings.enableModule());
	this.enablePreviewPane(Settings.enablePreviewPane());
};

/**
 * Returns Object with parameters for passing to the server while settings updating.
 * 
 * @returns Object
 */
CSettingsPaneView.prototype.getParametersForSave = function ()
{
	return {
		'EnableModule': this.enableModule(),
		'EnablePreviewPane': this.enablePreviewPane()
	};
};

/**
 * Applies new settings values to global settings object.
 * 
 * @param {Object} oParameters Parameters with new values which were passed to the server.
 */
CSettingsPaneView.prototype.applySavedValues = function (oParameters)
{
	Settings.update(oParameters.EnableModule, oParameters.EnablePreviewPane);
};

module.exports = new CSettingsPaneView();
