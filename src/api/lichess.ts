import axios from 'axios'

const axiosLichess = axios.create({
  baseURL: 'https://lichess.org',
  timeout: 1000,
  headers: {
    Accept: 'application/x-ndjson',
  },
  params: {
    pgnInJson: true,
    lastFen: true,
  },
})

export async function fetchGamesForUser(username: string, maxGames: number) {
  const gameURL = `/api/games/user/${username}?max=${maxGames}`
  const response = await axiosLichess.get(gameURL)

  const lines = response.data.trim().split('\n')
  const games = lines.map((line: any) => JSON.parse(line))
  return games
}
