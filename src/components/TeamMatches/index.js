// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {
    lastMatch: {},
    recentAllMatches: [],
    teamBannerUrl: '',
    isloading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches

    const latestMatchDetailsCamelCase = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      date: latestMatchDetails.date,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      umpires: latestMatchDetails.umpires,
      secondInnings: latestMatchDetails.second_innings,
      venue: latestMatchDetails.venue,
    }

    const recentMatchesCamelCase = recentMatches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      date: each.date,
      id: each.id,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      umpires: each.umpires,
      secondInnings: each.second_innings,
      venue: each.venue,
    }))

    this.setState({
      lastMatch: latestMatchDetailsCamelCase,
      recentAllMatches: recentMatchesCamelCase,
      teamBannerUrl: data.team_banner_url,
      isloading: false,
    })
  }

  render() {
    const {lastMatch, recentAllMatches, teamBannerUrl, isloading} = this.state
    return (
      <div>
        {isloading ? (
          <div className="loader">
            {' '}
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className="teamDetails">
            <img src={teamBannerUrl} alt="team banner" />
            <p>Latest Matches</p>
            <LatestMatch
              key={lastMatch.competingTeam}
              matchDetails={lastMatch}
            />
            <ul className="listOfMatches">
              {recentAllMatches.map(each => (
                <MatchCard key={each.competingTeam} matchDetails={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
