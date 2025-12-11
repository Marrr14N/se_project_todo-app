class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;

    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;

    this._templateElement = document.querySelector(this._selector);
  }

  _getTemplate() {
    return this._templateElement.content.querySelector(".todo").cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDateEl() {
    this._dateEl = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._dateEl.textContent = "";
    }
  }

  _generateCheckboxEl() {
    this._checkboxEl = this._todoElement.querySelector(".todo__completed");
    this._labelEl = this._todoElement.querySelector(".todo__label");

    this._checkboxEl.checked = this._completed;
    this._checkboxEl.id = `todo-${this._id}`;
    this._labelEl.setAttribute("for", `todo-${this._id}`);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
    this._checkboxEl.checked = this._completed;
  }

  _remove() {
    this._todoElement.remove();
  }

  _setEventListeners() {
    this._deleteBtnEl.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete(this._completed);
      }
      this._remove();
    });

    this._checkboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      if (this._handleCheck) {
        this._handleCheck(this._completed);
      }
    });
  }

  getView() {
    this._todoElement = this._getTemplate();

    this._deleteBtnEl = this._todoElement.querySelector(".todo__delete-btn");

    this._generateNameEl();
    this._generateDateEl();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
