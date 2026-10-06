export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/search") {
      return new Response("ZEXSON API is running!");
    }

    const q = url.searchParams.get("q");

    if (!q) {
      return Response.json(
        { error: "Search query missing" },
        { status: 400 }
      );
    }

    const apiUrl =
      "https://api.searlo.tech/api/v1/search/web?" +
      new URLSearchParams({
        q: q,
        limit: "10",
        gl: "in",
        hl: "en"
      });

    const response = await fetch(apiUrl, {
      headers: {
        "x-api-key": env.SEARLO_API_KEY
      }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
