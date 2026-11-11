# Klaudia Juhasz – Portfolio développeuse web

Développeuse web en reconversion, étudiante en **Bachelor Développement Web** à IRIS MediaSchool Nice,
après un **BTS SIO option SLAM** (Solutions Logicielles et Applications Métiers).

> **Je recherche une alternance d'un an en développement web back-end / full-stack**
> (rythme : 4 jours en entreprise, 1 jour à l'école).

| | |
|---|---|
| **Portfolio en ligne** | [juklau.github.io/portfolio](https://juklau.github.io/portfolio/index.html) |
| **CV** | [Télécharger mon CV (PDF)](assets/documents/JUHASZ_CV.pdf) |
| **LinkedIn** | [Klaudia Juhasz](https://www.linkedin.com/in/klaudia-juhasz-a165002bb/) |
| **GitHub** | [github.com/juklau](https://github.com/juklau) |

---

## Compétences techniques

Compétences mises en œuvre dans les projets et les stages présentés ci-dessous.

| Domaine | Technologies |
|---|---|
| **Back-end** | PHP (Symfony, Laravel, Slim), API REST, authentification JWT, Java |
| **Front-end** | HTML, CSS, JavaScript, Bootstrap, Twig, Blade, JavaFX, Swing |
| **Bases de données** | MySQL, PostgreSQL (Supabase), Airtable |
| **Qualité et tests** | PHPUnit, SonarQube, intégration continue (GitHub Actions) |
| **DevOps et outils** | Git / GitHub, Docker, Nginx, Apache, Maven |
| **Données et automatisation** | Python, Streamlit, n8n, consommation d'API (Open-Meteo, Unipile) |
| **Conception** | Figma (maquettes, prototypes), modélisation de bases de données (MCD), cahiers des charges |

---

## Projets phares

| Projet | Description | Technologies |
|---|---|---|
| [**RoomBooking**](https://juklau.github.io/portfolio/rp-roombooking.html) | Application de réservation de salles pour IRIS MediaSchool Nice : validation des comptes et des réservations, réservations multi-salles et récurrentes, quotas, tickets de support, journal d'audit, conformité RGPD. Livrée en une semaine, puis enrichie sur plusieurs mois et **déployée sur le serveur de l'école**. | Symfony, Twig, MySQL, PHPUnit, Docker, Nginx |
| [**CryptoVault**](https://juklau.github.io/portfolio/rp-cryptovault.html) | Coffre-fort numérique sécurisé réalisé en binôme : chiffrement des fichiers, gestion des droits, partages publics, traçabilité des actions. | API REST PHP (Slim), JWT, MySQL, client JavaFX, Docker, PHPUnit |
| [**MédiaStock**](https://juklau.github.io/portfolio/rp-mediastock.html) | Application web mobile-first de gestion de l'inventaire et des prêts de matériel, avec identification des équipements par QR code. | PHP, MySQL, JavaScript, Bootstrap, Docker |
| [**Météo 7 jours**](https://juklau.github.io/portfolio/rp-meteo_api.html) | Prévisions météo des villes de France à partir d'une API publique : statistiques, graphiques et carte interactive. | JavaScript, API Open-Meteo, Chart.js, Leaflet, Bootstrap |
| [**Mini-CRM**](https://juklau.github.io/portfolio/rp-gestion_contacts.html) | Gestion de contacts professionnels multi-utilisateurs, avec authentification et espaces de données isolés. | JavaScript, Bootstrap, API Airtable, Cloudinary |
| [**ClassCord Client**](https://juklau.github.io/portfolio/rp-chat.html) | Client de messagerie instantanée en réseau local : messages globaux et privés, statuts des utilisateurs. | Java, Swing, sockets TCP, Maven |

Chaque page projet présente le contexte, les besoins, les fonctionnalités (captures d'écran) et les compétences mobilisées.

---

## Expériences professionnelles

### Swantrad – Stage développeuse web (janvier – février 2026, Sophia-Antipolis)

Startup de digitalisation des traductions assermentées (signature électronique qualifiée eIDAS).
Amélioration de la qualité et de la fiabilité d'une application **en production** : réduction de la dette technique,
tests automatisés, analyse de code et intégration continue.

**Technologies :** Laravel, PHPUnit, SonarQube, GitHub Actions · [Voir le détail](https://juklau.github.io/portfolio/stage2.html)

### OPS IMPERIUM – Stage développeuse (juillet – août 2025, Nice)

Entreprise spécialisée en automatisation et intelligence artificielle.
Conception de **LinkStream**, une solution qui centralise et automatise la récupération des conversations LinkedIn
dans une base de données, consultable depuis une interface web.

**Technologies :** Python, Streamlit, Supabase (PostgreSQL), n8n, API Unipile · [Voir le détail](https://juklau.github.io/portfolio/stage1.html)

### Parcours précédent

Plusieurs années en restauration, jusqu'au poste de **cheffe de cuisine** avec la gestion d'une équipe de 5 à 6 personnes :
organisation, travail sous pression et sens des responsabilités, que je mets aujourd'hui au service de mes projets.

---

## Formation

| Période | Formation | Établissement |
|---|---|---|
| 2026 – 2027 | Bachelor Développement Web (en alternance) | IRIS MediaSchool Nice |
| 2024 – 2026 | BTS SIO, option SLAM | IRIS MediaSchool Nice |
| 2003 – 2009 | Deux licences (sciences économiques ; sciences de l'éducation), reconnues niveau Bac+3 en France | École Supérieure de Commerce de Budapest (Hongrie) |

---

## À propos de ce site

Site statique conçu et développé entièrement par moi, à partir d'une **maquette Figma** et selon une approche **mobile-first**.

**Technologies :** HTML5, CSS3, JavaScript (sans framework), Bootstrap 5, Bootstrap Icons, Font Awesome, AOS, Swiper, Formspree.

**Points techniques :**

- **Menu et pied de page générés en JavaScript** depuis un seul fichier (`assets/js/layout.js`) : une page s'ajoute ou se retire en une ligne, sur tout le site.
- **Thème clair / sombre** mémorisé dans le navigateur, appliqué avant l'affichage pour éviter tout « flash ».
- **Formulaire de contact** avec validation en temps réel (classes Bootstrap), champ anti-spam et envoi asynchrone (`fetch`) vers Formspree.
- **Accessibilité** : navigation au clavier, textes alternatifs, libellés pour les lecteurs d'écran.
- **Mentions légales** conformes au RGPD pour le formulaire de contact.

**Structure du dépôt :**

```
├── index.html                 Accueil (présentation, parcours, formation)
├── stages.html, stage1.html, stage2.html
├── projets.html, rp-*.html    Projets et pages de détail
├── veille*.html               Veille technologique (IA et accessibilité, cybersécurité)
├── CV.html, contact.html, mentions-legales.html, plan-du-site.html
├── style.css
└── assets/
    ├── js/                    layout.js, portfolio.js, contact.js, carousel.js
    ├── images/
    └── documents/             CV, fiches projets, rapports de stage (PDF)
```

**Lancer le site en local :** aucune installation n'est nécessaire. Ouvrez `index.html` avec l'extension
Live Server de VS Code, ou avec n'importe quel serveur web statique.

---

## Contact

Le moyen le plus simple : le [formulaire de contact du portfolio](https://juklau.github.io/portfolio/contact.html),
ou un message sur [LinkedIn](https://www.linkedin.com/in/klaudia-juhasz-a165002bb/).
