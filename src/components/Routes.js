import React, { useEffect, useState } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import HomePage from "../components/HomePage/HomePage";
import Movies from "../components/Movies/Movies";
import Genres from "../components/Genres/Genres";
import MyList from "../components/MyList/MyList";
import { setLogoCompactOn, setLogoCompactOff } from "../store/state/logoState";

const Routes = ({
  location,
  logoCompact,
  setLogoCompactOn,
  setLogoCompactOff
}) => {
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    setPreviousPage(location.pathname);
  }, [location]);

  useEffect(() => {
    //setting the correct logostate (for when using browser nav or direct link to the page)
    if (location.pathname === "/") {
      if (logoCompact) {
        setLogoCompactOff();
      }
    } else if (!logoCompact) {
      setLogoCompactOn();
    }
  });

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.pathname}
        in={true}
        timeout={1000}
        classNames="page-fade"
      >
        <div className="test">
          <Switch location={location}>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/genres" exact component={Genres} />
            <Route path="/mylist" exact component={MyList} />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const mapStateToProps = state => ({
  logoCompact: state.logoState.logoCompact
});

const mapDispatchToProps = dispatch => ({
  setLogoCompactOff: () => dispatch(setLogoCompactOff()),
  setLogoCompactOn: () => dispatch(setLogoCompactOn())
});

const wrappedComponent = withRouter(Routes);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
