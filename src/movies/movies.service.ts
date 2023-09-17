import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
    private movieList: Movie[] = []

    getAllMovies() {
        return this.movieList
    }

    getOneMovie(movieId: number) {
        const movie = this.movieList.find((movie) => movie.id === movieId)

        if (!movie) throw new NotFoundException(`${movieId} 영화를 찾을 수 없습니다.`)
        return movie
    }

    createMovie(createMovieData: CreateMovieDto) {
        this.movieList.push({ id: this.movieList.length + 1, ...createMovieData })
    }

    updateMovie(movieId: number, updateMovieData: UpdateMovieDto) {
        const movie = this.getOneMovie(movieId)
        this.deleteMovie(movieId)
        this.movieList.push({ ...movie, ...updateMovieData })
    }

    deleteMovie(movieId: number) {
        this.getOneMovie(movieId)
        this.movieList = this.movieList.filter((movie) => movie.id !== movieId)
    }
}
