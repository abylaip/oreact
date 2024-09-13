// oreact
function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((el) =>
        typeof el === "object" ? el : createTextElement(el)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  if (Array.isArray(element)) {
    for (let i = 0; i < element.length; i++) {
      render(element[i], container);
    }
    return;
  }
  let dom =
    element.type === "TEXT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  for (let i = 0; i < element.props.children.length; i++) {
    render(element.props.children[i], dom);
  }

  container.appendChild(dom);
}

const OReact = {
  createElement,
  createTextElement,
  render,
};

// rendering
const rootDiv = document.getElementById("root");

/** @jsx OReact.createElement */
function MyApp() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(
      <div style="color: blue">
        my name is <span style="color:orange">{i}</span>
      </div>
    );
  }
  return (
    <div>
      <p style="color: red">Items:</p>
      <br />
      {items}
      <button onClick="alert(1)">asd</button>
    </div>
  );
}

const element = MyApp();
OReact.render(element, rootDiv);

// let root = document.getElementById("root")

// ReactDOM.render(App, root);
