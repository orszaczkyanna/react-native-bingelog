import { searchMedia } from "@/features/watchlist/searchMedia";
import { tmdbApi } from "@/lib/axios";

jest.mock("@/lib/axios");

describe("searchMedia", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Verify successful search with movies and TV shows
  it("should return only movies and TV shows from search results", async () => {
    // Simulate mixed TMDb response including movie, tv and person
    (tmdbApi.get as jest.Mock).mockResolvedValueOnce({
      data: {
        results: [
          {
            id: 1,
            media_type: "movie",
            title: "Test Movie",
          },
          {
            id: 2,
            media_type: "tv",
            name: "Test TV Show",
          },
          {
            id: 3,
            media_type: "person", // Should be filtered out
            name: "Test Person",
          },
        ],
      },
    });

    const result = await searchMedia("test query");

    // Expect only movie and tv results to be returned
    expect(result).toHaveLength(2);

    // Expect EVERY item in the result array to be either "movie" or "tv"
    expect(
      result.every((item) => item.media_type === "movie" || item.media_type === "tv")
    ).toBe(true);
  });

  // Test case: Verify correct query and options are passed to the API
  it("should call API with correct parameters", async () => {
    const testQuery = "test title";
    const testPage = 2;
    const fakeKey = "FAKE_KEY";

    (tmdbApi.get as jest.Mock).mockResolvedValueOnce({
      data: { results: [] }, // an empty but valid response
    });

    await searchMedia(testQuery, testPage, fakeKey);

    expect(tmdbApi.get).toHaveBeenCalledWith(expect.stringContaining("/search/multi"), {
      params: {
        api_key: fakeKey,
        query: testQuery,
        page: testPage,
        include_adult: false,
      },
    });
  });

  // Test case: Verify error handling when API key is missing or invalid
  it("should throw error when API key is missing or invalid", async () => {
    const errRegEx = /search failed/i;

    await expect(searchMedia("test", 1, "invalid-key")).rejects.toThrow(errRegEx);
    await expect(searchMedia("test", 1, "")).rejects.toThrow(errRegEx);
    await expect(searchMedia("test", 1, undefined)).rejects.toThrow(errRegEx);

    // Note: toThrow() checks for substring, not full match
  });

  // Test case: Verify error handling for axios failures
  it("should throw error if API request fails", async () => {
    const errorMessage = "Network error";
    (tmdbApi.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(searchMedia("test")).rejects.toThrow(errorMessage);
  });
});
