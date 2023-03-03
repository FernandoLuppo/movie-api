//  Dependencies
import { Request, Response } from "express";
//  Hooks
import { Api } from "../../services";
//  Components
const API_KEY = process.env.API_KEY

export const tmdb = {

    getMovies: async (req: Request, res: Response) => {
        const movies = [
            {
                slug: "trending",
                title: "Recomendados para Você",
                items: (await Api().get(`/trending/all/week?api_key=${API_KEY}&language=pt-BR`)).data.results
            },
            {
                slug: "topRated",
                title: "Em alta",
                items: (await Api().get(`/movie/top_rated?api_key=${API_KEY}&language=pt-BR`)).data.results
            },
            {
                slug: "action",
                title: "Ação",
                items: (await Api().get(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=28`)).data.results
            },
            {
                slug: "comedy",
                title: "Comédia",
                items: (await Api().get(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=35`)).data.results
            },
            {
                slug: "horror",
                title: "Terror",
                items: (await Api().get(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=27`)).data.results
            },
            {
                slug: "romance",
                title: "Romance",
                items: (await Api().get(`/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=10749`)).data.results
            },
        ]        
        res.status(200).send(movies)
    }
}