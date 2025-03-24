class TodoList {
  constructor() {
    this.list = JSON.parse(localStorage.getItem("todoList")) || [];
  }

  addTask(task, priority) {
    this.list.push({ task, priority });
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.list.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.list[index].priority < this.list[parentIndex].priority) {
        [this.list[index], this.list[parentIndex]] = [
          this.list[parentIndex],
          this.list[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }

    localStorage.setItem("todoList", JSON.stringify(this.list));
  }

  removeTask() {
    if (this.list.length === 0) return;

    const removedTask = this.list[0];
    const lastTask = this.list.pop();

    if (this.list.length > 0) {
      this.list[0] = lastTask;
      this.heapifyDown();
    } else {
      localStorage.setItem("todoList", JSON.stringify(this.list));
    }
    return removedTask;
  }

  heapifyDown() {
    let index = 0;
    while (index < this.list.length) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      const leftChild = this.list[leftChildIndex];
      const rightChild = this.list[rightChildIndex];

      let smallest = index;
      if (leftChild && leftChild.priority < this.list[smallest].priority) {
        smallest = leftChildIndex;
      }
      if (rightChild && rightChild.priority < this.list[smallest].priority) {
        smallest = rightChildIndex;
      }
      if (smallest !== index) {
        [this.list[index], this.list[smallest]] = [
          this.list[smallest],
          this.list[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
    localStorage.setItem("todoList", JSON.stringify(this.list));
  }
}

class View {
  constructor(name, render) {
    this.name = name;
    this.render = render;
  }
}

class App {
  constructor() {
    this.todoList = new TodoList();
    this.views = [];
  }

  addView(name, html) {
    const view = new View(name, html);
    this.views.push(view);
  }

  addEvent(element, event, handler) {
    const domE = document.querySelector(element);
    if (domE) {
      domE.addEventListener(event, handler);
    } else {
      console.warn(`Element not found: ${element}`);
    }
  }

  rerenderView(name) {
    const view = this.views.find((view) => view.name === name);
    if (view) {
      const viewElement = document.querySelector(`#${name}`);
      if (viewElement) {
        viewElement.innerHTML = view.render();
      }
    }
  }

  initializeViews() {
    const root = document.querySelector("#root");
    this.views.forEach((view) => {
      const viewElement = document.createElement("div");
      viewElement.id = view.name;
      viewElement.style = viewElement.innerHTML = view.render();
      root.appendChild(viewElement);
    });
  }
}

const app = new App();
app.addView(
  "header",
  () => `
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Todo List App</h1>
    </div>
  </div>
`
);

app.addView("input", () => {
  return `<div class="input-group mb-3">
      <input type="text" class="js-text-input mr-2 mb-2" placeholder="Add new task">
      <input type="number" class="js-priority-input mr-2 mb-2" style="width: 75px;" placeholder="Priority">
      <div class="input-group-append">
        <button class="js-add btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
      </div>
    </div>`;
});

app.addView("delete", () => {
  return `<button class="js-delete btn bg-info mt-3 text-white">Complete highest priority task</button>`;
});

app.addView("list", () => {
  let list = `<ul class="list-group">`;
  for (let i = 0; i < app.todoList.list.length; i++) {
    let bgColor = "";

    switch (app.todoList.list[i].priority) {
      case "1":
        bgColor = "rgba(56, 152, 255, 0.8)"; // Light Blue for Priority 1
        break;
      case "2":
        bgColor = "rgba(70, 189, 132, 0.8)"; // Soft Green for Priority 2
        break;
      case "3":
        bgColor = "rgba(255, 215, 0, 0.8)"; // Gold for Priority 3
        break;
      case "4":
        bgColor = "rgba(255, 126, 0, 0.8)"; // Warm Orange for Priority 4
        break;
      case "5":
        bgColor = "rgba(112, 128, 144, 0.8)"; // Slate Gray for Priority 5
        break;
      default:
        bgColor = "rgba(255, 255, 255, 0.8)"; // Default if priority doesn't match
    }

    list += `<li class="list-group-item d-flex justify-content-between align-items-center mt-2" style="background-color: ${bgColor};">
          ${app.todoList.list[i].task} (Priority: ${app.todoList.list[i].priority})
        </li>`;
  }
  list += "</ul>";
  return list;
});

app.initializeViews();

app.addEvent(".js-add", "click", () => {
  const task = document.querySelector(".js-text-input").value;
  const priority = document.querySelector(".js-priority-input").value;
  if (!task || !priority) {
    return;
  }
  app.todoList.addTask(task, priority);
  document.querySelector(".js-text-input").value = "";
  document.querySelector(".js-priority-input").value = "";
  app.rerenderView("list");
});

app.addEvent(".js-priority-input", "keydown", (e) => {
  if (e.key === "Enter") {
    const task = document.querySelector(".js-text-input").value;
    const priority = document.querySelector(".js-priority-input").value;
    if (!task || !priority) {
      return;
    }
    app.todoList.addTask(task, priority);
    document.querySelector(".js-text-input").value = "";
    document.querySelector(".js-priority-input").value = "";
    app.rerenderView("list");
  }
});

app.addEvent(".js-text-input", "keydown", (e) => {
  if (e.key === "Enter") {
    const task = document.querySelector(".js-text-input").value;
    const priority = document.querySelector(".js-priority-input").value;
    if (!task || !priority) {
      return;
    }
    app.todoList.addTask(task, priority);
    document.querySelector(".js-text-input").value = "";
    document.querySelector(".js-priority-input").value = "";
    app.rerenderView("list");
  }
});

app.addEvent(".js-delete", "click", () => {
  if (app.todoList.list.length > 0) {
    app.todoList.removeTask();
  }
  app.rerenderView("list");
});
