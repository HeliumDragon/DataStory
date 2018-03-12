import { reducer } from './movies';
import * as frommovies from './movies';
import { SearchComplete, Load, Select } from '../actions/movie';
import { movie, generateMockmovie } from '../models/movie';
import { LoadSuccess } from '../actions/collection';

describe('moviesReducer', () => {
  const movie1 = generateMockmovie();
  const movie2 = { ...movie1, id: '222' };
  const movie3 = { ...movie1, id: '333' };
  const initialState: frommovies.State = {
    ids: [movie1.id, movie2.id],
    entities: {
      [movie1.id]: movie1,
      [movie2.id]: movie2,
    },
    selectedmovieId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    function noExistingmovies(
      action: any,
      moviesInitialState: any,
      initialState: any,
      movies: movie[]
    ) {
      const createAction = new action(movies);

      const result = reducer(moviesInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingmovies(action: any, initialState: any, movies: movie[]) {
      // should not replace existing movies
      const differentmovie2 = { ...movies[0], foo: 'bar' };
      const createAction = new action([movies[1], differentmovie2]);

      const expectedResult = {
        ids: [...initialState.ids, movies[1].id],
        entities: {
          ...initialState.entities,
          [movies[1].id]: movies[1],
        },
        selectedmovieId: null,
      };

      const result = reducer(initialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all movies in the payload when none exist', () => {
      noExistingmovies(SearchComplete, frommovies.initialState, initialState, [
        movie1,
        movie2,
      ]);

      noExistingmovies(LoadSuccess, frommovies.initialState, initialState, [
        movie1,
        movie2,
      ]);
    });

    it('should add only new movies when movies already exist', () => {
      existingmovies(SearchComplete, initialState, [movie2, movie3]);

      existingmovies(LoadSuccess, initialState, [movie2, movie3]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [movie1.id],
      entities: {
        [movie1.id]: movie1,
      },
      selectedmovieId: null,
    };

    it('should add a single movie, if the movie does not exist', () => {
      const action = new Load(movie1);

      const result = reducer(frommovies.initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the movie exists', () => {
      const action = new Load(movie1);

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected movie id on the state', () => {
      const action = new Select(movie1.id);

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getSelectedId', () => {
      it('should return the selected id', () => {
        const result = frommovies.getSelectedId({
          ...initialState,
          selectedmovieId: movie1.id,
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
