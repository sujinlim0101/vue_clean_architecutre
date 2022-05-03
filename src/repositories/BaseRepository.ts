interface BaseRepository {
  fetchItem: (city: string) => Promise<any>
}

export default BaseRepository
