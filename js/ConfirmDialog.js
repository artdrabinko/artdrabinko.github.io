class ConfirmDialog {
  constructor() {
    this.confirmDialog = document.getElementById('confirmDialog');
    this.dialogText = document.getElementById('dialogText');

    this.btnYes = document.getElementById('btnYes');
    this.btnNo = document.getElementById('btnNo');

    this.btnYes.addEventListener('click', this.heandlerConfirmButtons.bind(this), false);
    this.btnNo.addEventListener('click', this.heandlerConfirmButtons.bind(this), false);
  }

  hideConfirmDialog() {
    this.confirmDialog.classList.add('hide');
    this.dialogText.innerHTML = "Question?";
  }

  confirm(text, callback) {
    this.dialogText.innerHTML = text;
    this.confirmDialog.classList.remove('hide');
    this.callback = callback;
  }

  heandlerConfirmButtons(e) {
    if (e.target.id === 'btnYes') {
      console.log("true");
      this.hideConfirmDialog();

      this.callback();
    } else if (e.target.id === 'btnNo') {
      console.log("false");
      this.hideConfirmDialog();
      this.callback = null;
    }
  }

}