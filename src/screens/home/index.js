import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HeaderHome from './components/HeaderHome';
import {useDispatch} from 'react-redux';
import {getListMovieAsynTHunk} from '../../store/movieSlice';
import {useShallowEqualSelector} from '../../store/selector';
import ItemMovie from './components/ItemMovie';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home = () => {
  //  listMovie : bien , setListMovie : ham
  const [loading, setLoading] = useState(true);

  const {movies} = useShallowEqualSelector(state => ({
    movies: state.movie.movies,
  }));

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getListMovieAsynTHunk());
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome />
      <FlatList
        numColumns={2}
        style={{
          flexGrow: 0,
        }}
        data={movies}
        showsVerticalScrollIndicator={false}
        // call ItemMovie from ItemMovie file
        renderItem={({item}) => <ItemMovie item={item} />}
      />
    </View>
  );
};

export default Home;
