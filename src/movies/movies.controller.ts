import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAllMovies() {
        return this.moviesService.getAllMovies()
    }

    @Get('search')
    searchMovie(@Query('year') searchYear: string) {
        return `search movie ${searchYear}`
    }

    @Get(':id')
    getOneMovie(@Param('id') movieId: number) {
        return this.moviesService.getOneMovie(movieId)
    }

    @Post()
    createMovie(@Body() createMovieData: CreateMovieDto) {
        this.moviesService.createMovie(createMovieData)
    }

    @Delete(':id')
    deleteMovie(@Param('id') movieId: number) {
        this.moviesService.deleteMovie(movieId)
    }

    @Patch(':id')
    patchMovie(@Param('id') movieId: number, @Body() updateMovieData: UpdateMovieDto) {
        this.moviesService.updateMovie(movieId, updateMovieData)
    }
}
