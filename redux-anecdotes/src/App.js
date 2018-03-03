import React from "react";

class App extends React.Component {
  addNewAnecdote = event => {
    event.preventDefault();
    const content = event.target.content.value;
    this.props.store.dispatch({
      type: "ADD_ANECDOTE",
      content: content
    });
    this.content.value = "";
  };

  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() =>
                  this.props.store.dispatch({ type: "VOTE", id: anecdote.id })
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.addNewAnecdote}>
          <div>
            <input name={"content"} ref={input => (this.content = input)} />
          </div>
          <button type={"submit"}>create</button>
        </form>
      </div>
    );
  }
}

export default App;
