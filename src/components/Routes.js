import React, { useEffect } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect, useDispatch } from "react-redux";
import { fetchConfig } from "../store/state/config";
import { setLogoCompactOn, setLogoCompactOff } from "../store/state/logoState";
import HomePage from "../components/HomePage/HomePage";
import Movies from "../components/Movies/Movies";
import Genres from "../components/Genres/Genres";
import MyList from "../components/MyList/MyList";
import MoviePage from "./MoviePage/MoviePage";
import GenreMoviesPage from "./GenreMoviesPage/GenreMoviesPage";
import SearchPage from "./SearchPage/SearchPage";

const Routes = ({
  location,
  logoCompact,
  setLogoCompactOn,
  setLogoCompactOff
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfig());
  }, []);

  useEffect(() => {
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
        <div>
          <Switch location={location}>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/genres" exact component={Genres} />
            <Route path="/genre/:id" exact component={GenreMoviesPage} />
            <Route
              path="/genres/how"
              exact
              render={props => <Genres {...props} how={true} />}
            />
            <Route path="/mylist" exact component={MyList} />
            <Route path="/movie/:id" exact component={MoviePage} />
            <Route path="/search/:term" exact component={SearchPage} />
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
