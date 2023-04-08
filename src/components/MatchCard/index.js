import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = matchDetails

  return (
    <li className="eachTeam">
      <img
        className="logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      {matchStatus === 'Won' ? (
        <p className="green">{matchStatus}</p>
      ) : (
        <p className="red">{matchStatus}</p>
      )}
    </li>
  )
}

export default MatchCard
