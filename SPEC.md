# `grdn` Specification

- A `Garden` is the top-level item in a garden feed. It has three required fields:
    - `title`: a string, naming the garden itself. Required: users need to be able to identify any given garden easily.

    - `link`: a `URL` which represents the home of the garden on the web.

    - `self`: a `URL` which represents a location to find the garden feed itself

    - `last_updated`: a required `DateTime` indicating the last time the garden was updated

    - `items`: an array of the items belonging to the garden

- A `DateTime` is an ISO8601-compatible date or date-time string.

- A `URL` is any valid <abbr>URL</abbr> per the [<abbr title="Web Hypertext Application Technology Working Group">WHATWG</abbr> <abbr>URL</abbr> Living Standard](https://url.spec.whatwg.org)

- An `Item` is a unique entry within the garden. `Item`s must be stable over time.
    - `title`: a string, naming the item. Unlike JSON Feed, this is required: garden entries are not microblog posts.

    - `link`: TODO

    - `id`: TODO

        > **Note** I currently have in mind for this to be a v4 UUID, but [cool URIs don’t change](https://www.w3.org/Provider/Style/URI) so maybe the spec should just require a `link` instead?

    - `summary`: TODO

    - `created`: a required `DateTime` indicating when the `Item` was created

    - `updates`: an array of `Update`s, listing all the meaningful changes to the item since its creation

- An `Update` represents a *meaningful* update to the content of the item. Typo fixes may or may not count: did it change the *meaning* someone would get from the content? Then it should be included. Was it something trivial like correcting "pepole" to "people"? Then it should be excluded. It consists of:
    - `time`: a required `DateTime` indicating when the change was published

    - `change`: a `Change` which clients can use to present the nature of the update to the end user

- A `Change` is ==TODO==

==TODO: describe the rest of it==

---

Serialized to JSON, a Garden might look like this:

```json
{
  "title": "Chris Krycho’s blog-garden-zettel-thingy",
  "link": "https://garden.chriskrycho.com",
  "self": "https://garden.chriskrycho.com/garden.json",
  "latest": {
    "time": "2023-01-21T17:34:00-0700",
    "changes": [
      {
        "id": "https://garden.chriskrycho.com/garden-feeds",
        "change": {
          
        }
      }
    ]
  },
  "items": [
    {
      "title": "Garden Feeds: An Introduction",
      "created": "2023-01-13T12:15:00-0700",
      "id": "85f97ad4-d802-4b2c-8e08-c8052ff85023",
      "link": "https://garden.chriskrycho.com/garden-feeds",
      "updates": [
        {
          "time": "2023-01-21T17:34:00-0700",
          "change": {
            "summary": "Added a first sketch of the new garden-oriented feed-like protocol.",
            "patch": "@@ -198,4 +198,9 @@ Note that these changes are *not* the same as the set of changes which would mak\n \n Should we even call this new thing a “feed”? Perhaps not.\n \n-==TODO: keep going!==\n No newline at end of file\n+==TODO: keep going!==\n+\n+There will nonetheless also be a lot of commonalities with traditional feeds. After all, even with a garden, the point here is to provide a mechanism for readers to be notified of changes.\n+\n+Here is a first sketch of the protocol, as I am thinking of it so far (with basically *zero* formality):\n+\n\n"
          }
        }
      ]
    }
  ]
}
```

Serialized to XML, a Garden might look like this:

```xml
<?xml version='1.0' encoding='utf-8'?>
<garden namespace='TODO'>
  <title>Chris Krycho’s blog-garden-zettel-thingy</title>
  <link href='https://garden.chriskrycho.com' />
  <link rel='self' href='https://garden.chriskrycho.com/garden.xml' />
  <last-updated>2023-01-15</last-updated>
  <items>
    <item>
      <title>Garden Feeds: An Introduction</title>
      <id>85f97ad4-d802-4b2c-8e08-c8052ff85023</id>
      <link href='https://garden.chriskrycho.com/garden-feeds' />
      <created>2023-01-21T17:34:00-0700</created>
      <updates>
        <update>
          <summary>
            Added a first sketch of the new garden-oriented feed-like protocol.
          </summary>
          <patch>
            <![CDATA[
                @@ -198,4 +198,9 @@ Note that these changes are *not* the same as the set of changes which would mak
                 
                 Should we even call this new thing a “feed”? Perhaps not.
                 
                -==TODO: keep going!==
                 No newline at end of file
                +==TODO: keep going!==
                +
                +There will nonetheless also be a lot of commonalities with traditional feeds. After all, even with a garden, the point here is to provide a mechanism for readers to be notified of changes.
                +
                +Here is a first sketch of the protocol, as I am thinking of it so far (with basically *zero* formality):
                +
                
                
            ]]>
          </patch>
        </update>
      </updates>
    </item>
  </items>
</garden>
```
