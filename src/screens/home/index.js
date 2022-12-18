import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import HeaderHome from './components/HeaderHome';
import {useDispatch} from 'react-redux';
import {getListMovieAsynTHunk} from '../../store/movieSlice';
import {useShallowEqualSelector} from '../../store/selector';
import ItemMovie from './components/ItemMovie';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
  },
  touch: {
    backgroundColor: 'blue',
    height: 30,
    width: 100,
    marginVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  load: {
    color: 'white',
  },
});

const Home = () => {
  //  listMovie : bien , setListMovie : ham
  // const [loading, setLoading] = useState(true);

  const [page, setPase] = useState(1);

  const {movies, loading} = useShallowEqualSelector(state => ({
    movies: state.movie.movies,
    loading: state.movie.loading,
  }));
  console.log({loading});

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getListMovieAsynTHunk(page));
  }, [page]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'red'}}>hello loading</Text>
      </View>
    );
  }
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
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            setPase(page + 1);
          }}
          style={styles.touch}>
          <Text style={styles.load}>Load more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
