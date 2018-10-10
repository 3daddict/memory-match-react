import React from 'react'

export default function HighScoreList(props) {
  const _renderScore = (score, key) => {
    return <li key={key}>{`${score} attempts`}</li>
  }

  const _renderList = () => {
    return props.scores.length ? (
      <ul>
        {props.scores.map(_renderScore)}
      </ul>
    ) : (
      <p>No games played yet</p>
    )

  }

  return (
    <div id="HighScoreList">
      <h2>High Score List</h2>
      {_renderList()}
    </div>
  )
}