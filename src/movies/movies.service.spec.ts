import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Movie } from './entities/movie.entity'
import { MoviesService } from './movies.service'

describe('MoviesService', () => {
    let service: MoviesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile()

        service = module.get<MoviesService>(MoviesService)
    })

    it('movie service가 정의되어 있다.', () => {
        expect(service).toBeDefined()
    })

    describe('getAllMovies 테스트', () => {
        it('배열을 return 해야 한다.', () => {
            const result = service.getAllMovies()
            expect(result).toBeInstanceOf(Array)
        })
    })

    describe('getOneMovie 테스트', () => {
        it('한개의 영화 정보를 return 해야 한다.', () => {
            service.createMovie({
                title: 'test movie',
                year: 2022,
                genres: [],
            })

            const movie = service.getOneMovie(1)
            expect(movie).toBeDefined()
            expect(movie.id).toEqual(1)
        })

        it('404 에러가 발생한다.', () => {
            try {
                service.getOneMovie(123123)
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException)
            }
        })
    })

    describe('deleteMovie 테스트', () => {
        it('한 개의 영화가 삭제된다.', () => {
            service.createMovie({
                title: 'delete movie',
                year: 2022,
                genres: [],
            })

            const prevMovies = service.getAllMovies().length
            service.deleteMovie(1)
            const afterMovies = service.getAllMovies().length
            expect(afterMovies).toBeLessThan(prevMovies)
        })

        it('404 에러가 발생한다.', () => {
            try {
                service.deleteMovie(123)
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException)
            }
        })
    })

    describe('createMovie 테스트', () => {
        it('한 개의 영화가 추가된다.', () => {
            const prevMovies = service.getAllMovies().length
            service.createMovie({
                title: 'create movie',
                year: 2022,
                genres: [],
            })
            const afterMovies = service.getAllMovies().length
            expect(afterMovies).toBeGreaterThan(prevMovies)
        })
    })

    describe('updateMovie 테스트', () => {
        it('영화 정보가 업데이트 된다.', () => {
            service.createMovie({
                title: 'create movie',
                year: 2022,
                genres: [],
            })

            service.updateMovie(1, { title: 'update movie' })
            const movie = service.getOneMovie(1)
            expect(movie.title).toEqual('update movie')
        })

        it('404 에러가 발생한다.', () => {
            try {
                service.updateMovie(1, { title: 'update movie' })
            } catch (err) {
                expect(err).toBeInstanceOf(NotFoundException)
            }
        })
    })
})
