---
layout: page
title: Blog
permalink: /blog/
nav: true
nav_order: 3
---

{% if site.posts.size > 0 %}
<ul>
  {% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a> <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time></li>
  {% endfor %}
</ul>
{% else %}
No posts yet.
{% endif %}
