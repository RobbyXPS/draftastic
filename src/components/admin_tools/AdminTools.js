import React from "react";
import PlayerList from "../rosters/PlayerList";
import TradeInfo from "../rosters/TradeInfo";
import ReviewTrade from "../rosters/ReviewTrade";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { clearPlayerList } from "../../store/actions/playerActions";

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
  }

  // helper function to adjust UI elements until user selects a team to trade with
  hideUntilTeamsSelected(selected_teams, selected_players) {
    const styleObj = {
      teamGeneric: "",
      teamOneMargin: "1rem",
      teamOneClass: "area-container",
      teamTwoMargin: "1rem",
      teamTwoClass: "area-container",
      playerGeneric: "",
      playerGenericReverse: "hide"
    };
    if (selected_teams.teamOne.length == 0) {
      styleObj.teamGeneric = "hide";
      styleObj.teamOneClass = "area-container hide";
      styleObj.teamTwoMargin = "51%";
    }
    if (selected_teams.teamTwo.length == 0) {
      styleObj.teamTwoClass = "area-container hide";
      styleObj.teamOneMargin = "51%";
    }
    if (
      selected_players.teamOne.player_id.length == 0 ||
      selected_players.teamTwo.player_id.length == 0
    ) {
      styleObj.playerGeneric = "hide";
      styleObj.playerGenericReverse = "";
    }
    return styleObj;
  }

  componentDidUpdate(prevProps) {
    // need to do a check on prevProps so that the componentdidupdate doesn't infinitely update when state changes
    if (
      this.props.selected_teams.teamOne !== prevProps.selected_teams.teamOne
    ) {
      this.props.clearPlayerList({
        team_container: "teamOne"
      });
    }
    if (
      this.props.selected_teams.teamTwo !== prevProps.selected_teams.teamTwo
    ) {
      this.props.clearPlayerList({
        team_container: "teamTwo"
      });
    }
  }

  render() {
    // deconstruct props passed in from state
    const { teams } = this.props;
    const { players } = this.props;
    const { selected_teams } = this.props;
    const { selected_players } = this.props;
    const { team_salaries_total } = this.props;
    const { outgoing_players_salary } = this.props;

    return (
      <div className="main-content-area" id="admin-tools-container">
        <header>
          <div id="header-container">
            <h1 id="header-title">The Robby Trade Machine</h1>
            <div className="ball"></div>
            <div id="trade-machine-rules">
              <h2 id="trade-machine-rules-header">Welcome!</h2>
              <p>
                If you are looking at this, that means you are either one of my
                12 fantasy basketball friends, a potential employer, or you just
                got really lucky and stumbled upon the awesomeness that is The
                Robby Trade Machine.
                <br />
                <br />
                Now that you are here, call a timeout and give it a try...
                <br />
                <br />
                <span className="bold">Step 1:</span> Select Teams
                <br />
                <span className="bold">Step 2:</span> Select Players to Trade
                <br />
                <span className="bold">Step 3:</span> Review the Trade
                <br />
                <br />
                Game on!
              </p>
            </div>
          </div>
        </header>
        <div id="header-gradient"></div>
        <div id="team-selection-main-container">
          <div className="step-label">#1</div>
          <h1 id="team-selection-section-header" className="section-title">
            Select Teams:
          </h1>
          <div id="team-selection-sub-container">
            <div className="area-container">
              <TradeInfo
                selected_players={selected_players}
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                teams={teams}
              />
            </div>
            <div className="area-container">
              <TradeInfo
                selected_players={selected_players}
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                teams={teams}
              />
            </div>
          </div>
        </div>
        <div
          id="team-rosters-main-container"
          className={
            this.hideUntilTeamsSelected(selected_teams, selected_players)
              .teamGeneric
          }
        >
          <div className="step-label">#2</div>
          <h1 id="team-roster-section-header" className="section-title">
            Select Players:
          </h1>
          <div id="team-rosters-sub-container">
            <div
              id="team-rosters-team-one"
              className={
                this.hideUntilTeamsSelected(selected_teams, selected_players)
                  .teamOneClass
              }
              style={{
                marginRight: this.hideUntilTeamsSelected(
                  selected_teams,
                  selected_players
                ).teamOneMargin
              }}
            >
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamOne"
                selected_players={selected_players}
              />
            </div>
            <div
              id="team-rosters-team-two"
              className={
                this.hideUntilTeamsSelected(selected_teams, selected_players)
                  .teamTwoClass
              }
              style={{
                marginLeft: this.hideUntilTeamsSelected(
                  selected_teams,
                  selected_players
                ).teamTwoMargin
              }}
            >
              <PlayerList
                players={players}
                currentTeams={selected_teams}
                containerValue="teamTwo"
                selected_players={selected_players}
              />
            </div>
          </div>
        </div>
        <div
          id="trade-proposition-main-container"
          className={
            this.hideUntilTeamsSelected(selected_teams, selected_players)
              .playerGeneric
          }
        >
          <div className="step-label">#3</div>
          <h1 id="team-trade-review-section-header" className="section-title">
            Review Trade:
          </h1>
          <div
            className={
              this.hideUntilTeamsSelected(selected_teams, selected_players)
                .playerGeneric
            }
          >
            <ReviewTrade
              selected_players={selected_players}
              players={players}
              currentTeams={selected_teams}
              outgoing_players_salary={outgoing_players_salary}
              team_salaries_total={team_salaries_total}
            />
          </div>
        </div>
        <footer
          className={
            this.hideUntilTeamsSelected(selected_teams, selected_players)
              .playerGenericReverse
          }
        ></footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.firestore.ordered.teams,
    players: state.firestore.ordered.players,
    selected_teams: state.selected_teams,
    selected_players: state.selected_players,
    team_salaries_total: state.team_salaries_total,
    outgoing_players_salary: state.outgoing_players_salary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearPlayerList: player => dispatch(clearPlayerList(player))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "teams" }, { collection: "players" }])
)(AdminTools);
