'use babel';

import protoWebotsView from './PROTO-Webots-view';
import { CompositeDisposable } from 'atom';

export default {

  protoWebotsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.protoWebotsView = new protoWebotsView(state.protoWebotsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.protoWebotsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'PROTO-Webots:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.protoWebotsView.destroy();
  },

  serialize() {
    return {
      protoWebotsViewState: this.protoWebotsView.serialize()
    };
  },

  toggle() {
    console.log('protoWebots was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
