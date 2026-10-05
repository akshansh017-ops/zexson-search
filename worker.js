export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/search") {
      return new Response("ZEXSON API is running!");
    }

    const q = url.searchParams.get("q");

    if (!q) {
      return Response.json({ error: "Search query missing" }, { status: 400 });
    }

    const response = await fetch(
      "https://api.endless.sbs/search?q=" +
      encodeURIComponent(q) +
      "&format=json",
      {
        headers: {
          "X-API-Key": env.ENDLESS_API_KEY
        }
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
