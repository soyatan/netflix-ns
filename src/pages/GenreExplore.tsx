import { useParams } from "react-router-dom";
import GridPage from "src/components/GridPage";
import MainLoadingScreen from "src/components/MainLoadingScreen";
import { COMMON_TITLES } from "src/constant";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";

export default function GenreExplore() {
  const { genreId } = useParams();
  const { data: genres, isLoading } = useGetGenresQuery(MEDIA_TYPE.Movie);
  let genre: Genre | CustomGenre | undefined;
  if (isNaN(parseInt(genreId as string))) {
    genre = COMMON_TITLES.find((t) => t.apiString === genreId);
  } else {
    genre = genres?.find((t) => t.id.toString() === genreId);
  }
  if (isLoading) {
    return (
      <div style={{ color: "white" }}>
        <MainLoadingScreen />
      </div>
    );
  } else if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }
  return null;
}
