class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer">
      <h2>Build with ❤️, from Aditya Bani Isro</h2>
    </div>`;
  }
}

customElements.define("foo-ter", Footer);
