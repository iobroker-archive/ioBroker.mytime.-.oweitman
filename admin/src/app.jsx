import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GenericApp from "@iobroker/adapter-react/GenericApp";
import Settings from "./components/settings";

/**
 * @type {(_theme: Theme) => import("@material-ui/styles").StyleRules}
 */
const styles = (_theme) => ({
    root: {},
});

class App extends GenericApp {
    constructor(props) {
        const extendedProps = {
            ...props,
            encryptedFields: [],
            translations: {
                "en": require("./i18n/en.json"),
                "de": require("./i18n/de.json"),
                "ru": require("./i18n/ru.json"),
                "pt": require("./i18n/pt.json"),
                "nl": require("./i18n/nl.json"),
                "fr": require("./i18n/fr.json"),
                "it": require("./i18n/it.json"),
                "es": require("./i18n/es.json"),
                "pl": require("./i18n/pl.json"),
                "zh-cn": require("./i18n/zh-cn.json"),
            },
        };
        super(props, extendedProps);
    }

    onConnectionReady() {
        // executed when connection is ready
    }


    //overloaded from GenericApp, because own savemethod in the adapter is used.
	onSave(isClose) {
        let oldObj;
        if (this.state.isConfigurationError) {
            this.setState({errorText: this.state.isConfigurationError});
            return;
        }

        this.socket.getObject(this.instanceId)
            .then(() => {
                this.setState({changed: false});
                isClose && GenericApp.onClose();
            });
    }

    render() {
        if (!this.state.loaded) {
            return super.render();
        }
		
		const context = {
			socket: this.socket,
			instanceId: this.instanceId,			
		}

        return (
            <div className="App">
                <Settings 
					native={this.state.native} 
					context={context}
					onChange={(attr, value) => this.setState({[attr]:value})}
					changed={this.state.changed}
				/>

				{this.renderError()}
				{this.renderToast()}
				{this.renderSaveCloseButtons()}
            </div>
        );
    }
}

export default withStyles(styles)(App);