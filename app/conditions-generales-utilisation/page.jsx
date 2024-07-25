// app/conditions-generales-utilisation/page.jsx
import React from 'react';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

const CGU = () => {
    return (
        <>
            <title>Conditions Générales d'Utilisation - Urban Root</title>
            <meta name="description" content="Consultez nos conditions générales d'utilisation." />
            <meta name="keywords" content="cgu, conditions générales d'utilisation" />

            <Navbar />
            <div className="navbar-padding-protection"></div>
            {/* Section Conditions générales d'utilisation */}
            <section className="container text-white" aria-label="Conditions générales d'utilisation">
                <h1>Conditions Générales d'Utilisation</h1>

                <p>
                    Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation de la plateforme Urban Root (ci-après "la Plateforme"), propriété de l'Agence Lavender. <br /> En accédant à la Plateforme ou en l'utilisant de quelque manière que ce soit, vous acceptez d'être lié par ces CGU.
                </p>
                <p>
                    Si vous n'acceptez pas ces CGU, veuillez ne pas accéder à la Plateforme ni l'utiliser.
                </p>

                <h2 className="pt-4">Table des matières</h2>

                <ol className="table-of-contents">
                    <li>
                        <a
                            href="/conditions-generales-utilisation#definition"
                            aria-label="Définitions"
                            aria-controls="definition"
                        >
                            Définitions
                        </a>
                    </li>
                    <li>
                        <a
                            href="/conditions-generales-utilisation#utilisation-de-la-plateforme"
                            aria-label="Utilisation de la plateforme"
                            aria-controls="utilisation-de-la-plateforme"
                        >
                            Utilisation de la plateforme
                        </a>
                    </li>
                    <li>
                        <a
                            href="/conditions-generales-utilisation#propriete-intellectuelle"
                            aria-label="Propriété intellectuelle"
                            aria-controls="propriete-intellectuelle"
                        >
                            Propriété intellectuelle
                        </a>
                    </li>
                    <li>
                        <a
                            href="/conditions-generales-utilisation#limitation-de-responsabilite"
                            aria-label="Limitation de responsabilité"
                            aria-controls="limitation-de-responsabilite"
                        >
                            Limitation de responsabilité
                        </a>
                    </li>
                    <li>
                        <a
                            href="/conditions-generales-utilisation#modifications-des-cgu"
                            aria-label="Modifications des CGU"
                            aria-controls="modifications-des-cgu"
                        >
                            Modifications des CGU
                        </a>
                    </li>
                    <li>
                        <a
                            href="/conditions-generales-utilisation#dispositions-generales"
                            aria-label="Dispositions générales"
                            aria-controls="dispositions-generales"
                        >
                            Dispositions générales
                        </a>
                    </li>
                </ol>

                {/* Définitions */}
                <article id="definition" aria-labelledby="definition-heading">
                    <h2 id="definition-heading">1. Définitions</h2>
                    <ul>
                        <li>
                            <b>Utilisateur :</b> Toute personne physique ayant accès aux services et/ou fonctionnalités de la Plateforme.
                        </li>
                        <li>
                            <b>Plateforme :</b> Désigne la plateforme Urban Root ainsi que toutes ses fonctionnalités et services associés.
                        </li>
                        <li>
                            <b>Poste :</b> Contenu publié par un Utilisateur sur le forum de la Plateforme.
                            </li>
                        <li>
                            <b>Carte :</b> Section de la Plateforme permettant de visualiser et filtrer les jardins urbains francophones.
                        </li>
                        <li>
                            <b>Guide :</b> Section de la Plateforme rassemblant des guides et des ressources sur le jardinage urbain et des sujets connexes.
                        </li>
                    </ul>
                </article>
                {/* End Définitions */}

                {/* Utilisation de la plateforme */}
                <article id="utilisation-de-la-plateforme" aria-labelledby="utilisation-de-la-plateforme-heading">
                    <h2 id="utilisation-de-la-plateforme-heading">
                        2. Utilisation de la plateforme
                    </h2>
                    <h4>
                        2.1 Inscription et Compte Utilisateur
                    </h4>
                    <p>
                        Pour accéder à certaines fonctionnalités de la Plateforme, vous devez créer un compte utilisateur.
                        <br />
                        Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités se déroulant sous votre compte.
                    </p>

                    <h4>
                        2.2 Contenu Utilisateur
                    </h4>
                    <p>
                        Vous êtes seul responsable du contenu que vous publiez sur la Plateforme, y compris les informations de votre profil, les publications sur le forum et tout autre contenu. Vous garantissez que tout contenu que vous publiez respecte les droits de propriété intellectuelle et ne viole aucune loi ou régulation applicable.
                    </p>

                    <h4>
                        2.3 Comportement et Responsabilités
                    </h4>
                    <p>
                        En utilisant la Plateforme, vous vous engagez à respecter les droits des autres Utilisateurs et à ne pas publier de contenu offensant, diffamatoire ou contraire à la loi. Urban Root se réserve le droit de supprimer tout contenu jugé inapproprié.
                    </p>

                    <h4>
                        2.4 Accès aux fonctionnalités sans compte
                    </h4>
                    <div>
                        Sans créer de compte, vous pouvez :
                        <ul>
                            <li>- Consulter la carte des jardins urbains et les filtrer selon des critères spécifiques.</li>
                            <li>- Voir les derniers posts sur le forum de la communauté.</li>
                            <li>- Accéder aux guides sur le jardinage urbain et les sujets connexes.</li>
                        </ul>
                    </div>
                </article>
                {/* End Utilisation de la plateforme */}

                {/* Propriété intellectuelle */}
                <article id="propriete-intellectuelle" aria-labelledby="propriete-intellectuelle-heading">
                    <h2 id="propriete-intellectuelle-heading">
                        3. Propriété intellectuelle
                    </h2>
                    <p>
                        Tous les contenus présents sur la Plateforme, y compris les textes, images, logos et autres éléments, sont la propriété exclusive de Urban Root ou de ses partenaires. Toute reproduction, distribution ou utilisation de ces contenus sans autorisation préalable est strictement interdite.
                    </p>
                </article>
                {/* End Propriété intellectuelle */}

                {/* Limitation de responsabilité */}
                <article id="limitation-de-responsabilite" aria-labelledby="limitation-de-responsabilite-heading">
                    <h2 id="limitation-de-responsabilite-heading">
                        4. Limitation de responsabilité
                    </h2>
                    <p>
                        Urban Root s'efforce de maintenir la Plateforme accessible et sécurisée.
                        <br />
                        Cependant, nous ne pouvons garantir l'absence d'interruptions ou d'erreurs.
                        <br />
                        En aucun cas, Urban Root ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de la Plateforme.
                    </p>
                </article>
                {/* End Limitation de responsabilité */}

                {/* Modifications des CGU */}
                <article id="modifications-des-cgu" aria-labelledby="modifications-des-cgu-heading">
                    <h2 id="modifications-des-cgu-heading">
                        5. Modifications des CGU
                    </h2>
                    <p>
                        Urban Root se réserve le droit de modifier ces CGU à tout moment. Les modifications prendront effet dès leur publication sur la Plateforme.
                        <br />
                        Il est de votre responsabilité de consulter régulièrement ces CGU pour prendre connaissance des éventuelles mises à jour.
                    </p>
                </article>
                {/* End Modifications des CGU */}

                {/* Dispositions générales */}
                <article id="dispositions-generales" aria-labelledby="dispositions-generales-heading">
                    <h2 id="dispositions-generales-heading">
                        6. Dispositions générales
                    </h2>
                    <p>
                        Si l'une des dispositions des présentes CGU est jugée invalide ou inapplicable, cela n'affectera pas la validité des autres dispositions.
                    </p>
                    <p>
                        Les présentes CGU sont régies par le droit français.
                    </p>
                    <p>
                        Pour toute question concernant ces CGU, veuillez nous contacter à <strong>agence.lavender@gmail.com</strong>.
                    </p>
                    <p>
                        <b>Dernière mise à jour :</b> 25 juillet 2024
                    </p>
                </article>
            </section>
            {/* End Section Conditions générales d'utilisation */}
            <Footer />
        </>
    )
}

export default CGU;
