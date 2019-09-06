import React from "react";

const todos = [
  { id: 0, title: "Learn ReactJS", done: false },
  { id: 1, title: "Learn Javascript", done: false }
];

class ToDo extends React.Component {
  state = {
    todos: todos,
    openForm: false,
    title: "",
    searchText: ""
  };

  add = () => {
    this.setState({ title: "", openForm: true });
  };
  submit = e => {
    e.preventDefault();
    const { todos, title } = this.state;
    todos.push({ title, done: false, id: todos.length });
    this.setState({ todos, openForm: false });
  };
  onChange = e => {
    this.setState({ title: e.target.value });
  };

  toggle = item => {
    const { todos } = this.state;
    const { done } = item;
    const index = todos.findIndex(i => i.id === item.id);
    todos[index] = { ...item, done: !done };
    this.setState({ todos });
  };

  delete = item => {
    const { todos } = this.state;
    const index = todos.findIndex(i => i.id === item.id);
    todos.splice(index, 1);
    this.setState({ todos });
  };

  onSearch = e => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { openForm, title, searchText, todos } = this.state;
    return (
      <>
        <input
          placeholder="Input to search"
          type="text"
          value={searchText}
          onChange={this.onSearch}
        />
        <div className="items">
          {todos.map(item => {
            const isMatch =
              !searchText ||
              item.title.toLowerCase().includes(searchText.toLowerCase());
            return (
              <div key={item.id}>
                {isMatch && (
                  <div className="item">
                    <input type="checkbox" onChange={() => this.toggle(item)} />
                    <span className={item.done ? "done" : "do"}>
                      {item.title}
                    </span>
                    <button
                      className="delete"
                      onClick={() => this.delete(item)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {openForm && (
          <form onSubmit={this.submit}>
            <p>What do you want to do?</p>
            <input type="text" value={title} onChange={this.onChange} />
            <button type="submit">Submit</button>
          </form>
        )}

        {!openForm && <button onClick={this.add}>Add</button>}
      </>
    );
  }
}

export default ToDo;
