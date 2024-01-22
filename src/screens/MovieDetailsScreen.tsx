import * as React from 'react';
import {View, RefreshControl, StyleSheet, ScrollView, Text} from 'react-native';

import {useQuery} from '@tanstack/react-query';

import {LoadingIndicator} from '../components/LoadingIndicator';
import {ErrorMessage} from '../components/ErrorMessage';
import {useRefreshByUser} from '../hooks/useRefreshByUser';

import {MovieDetails, fetchMovie} from '../services/api-cc';

type Props = {
  route: any;
};

export function MovieDetailsScreen({route}: Props) {
  const {isPending, error, data, refetch} = useQuery<MovieDetails, Error>({
    queryKey: ['movie', route.params.movie.title],
    queryFn: () => fetchMovie(route.params.movie.title),
    initialData: route.params.movie as MovieDetails,
  });

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  if (isPending) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  if (!data) {
    return null;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }>
      <View style={styles.titleRow}>
        <Text>
          {data.title} ({data.year})
        </Text>
      </View>
      {data.info ? (
        <>
          <View style={styles.infoRow}>
            <Text>{data.info.plot}</Text>
          </View>
          <View style={styles.actorsRow}>
            <Text>
              {data.info.actors.slice(0, -1).join(', ') +
                ' or ' +
                data.info.actors.slice(-1)}
            </Text>
          </View>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    margin: 20,
  },
  infoRow: {
    flexDirection: 'row',
    margin: 20,
  },
  actorsRow: {
    flexDirection: 'column',
    margin: 20,
    marginTop: 10,
  },
});
