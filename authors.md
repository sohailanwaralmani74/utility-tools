---
layout: main
title: Authors
description: Authors And Developers Of Blog.
keywords: blog authors, Blog developers, Software Developer, Software engineer, Java Developer, Angular Develpers
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "ReptileBirds",
      "url": "https://reptilebirds.com/",
      "logo": "https://reptilebirds.com/assets/img/logo.png"
    },
    {
      "@type": "WebSite",
      "url": "https://reptilebirds.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://reptilebirds.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://reptilebirds.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Authors",
          "item": "https://reptilebirds.com/authors"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sohail Anwar",
          "item": "https://reptilebirds.com/sohail-anwar"
        }
      ]
    },
    {
      "@type": "ItemList",
      "name": "Authors Listing",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Person",
            "name": "Sohail Anwar",
            "jobTitle": "Senior Software engineer",
            "image": "https://reptilebirds.com/assets/img/sohail-anwar.png",
            "description": "Proficient problem-solver and collaborator, skilled at translating business requirements into robust technical solutions.",
            "url": "https://reptilebirds.com/sohail-anwar",
            "knowsAbout": [
              "Java",
              "Angular",
              "Spring Boot",
              "Android"
            ]
          }
        }
      ]
    }
  ]
}
</script>

<!-- hero section -->
<section style="width: 100%;">
    <h1>Blog Authors</h1>

<div class="search-container">
   <i class="fas fa-search search-icon"></i>
   <input type="text" class="search-bar" id="searchInput" placeholder="Search Author">
</div>


<div class="container">
<div class="tool-grid" id="authorsGrid">
</div>
</div>
<script src="/assets/js/authors.js"></script>

