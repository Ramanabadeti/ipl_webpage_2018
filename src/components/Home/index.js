// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard/index'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isloading: true}

  componentDidMount() {
    this.getTeamsListData()
  }

  getTeamsListData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data.teams)
    const convertData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamsList: convertData, isloading: false})
  }

  render() {
    const {teamsList, isloading} = this.state
    return (
      <div>
        {isloading ? (
          <div className="loader">
            {' '}
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className="main">
            <h1>
              <img
                className="iplLogo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
              />
              IPL Dashboard
            </h1>

            <ul className="teamsList">
              {teamsList.map(team => (
                <TeamCard key={team.name} teamDetails={team} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
