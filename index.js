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
const element = (
  <div style="background: red">
    <h1>YOYO</h1>
    <h2 style="text-align:right">from OReact</h2>
  </div>
);

OReact.render(element, rootDiv);

// let root = document.getElementById("root")

// ReactDOM.render(App, root);

