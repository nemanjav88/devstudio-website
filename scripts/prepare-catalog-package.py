"""Build review-only catalog manifest from manually reviewed, source-grounded copy.

No database access. Run after extract-catalog.py. Review pages and source text are
evidence; only approved media is in the executable import plan. No photos are edited.
"""
import hashlib
import json
import shutil
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'content-import'
previous_file = OUT / 'manifest/catalog-content.json'
previous = json.loads(previous_file.read_text(encoding='utf8')) if previous_file.exists() else None
SOLUTIONS = []

def solution(key, group, pages, title_bhs, title_en, slug_bhs, short_bhs, short_en, bhs, en, hero, gallery, notes=''):
    SOLUTIONS.append(dict(key=key, solutionGroup=group, sourcePages=pages,
        locales={'bhs': dict(title=title_bhs, slug=slug_bhs, shortDescription=short_bhs, body=bhs.strip()),
                 'en': dict(title=title_en, slug=key, shortDescription=short_en, body=en.strip())},
        recommendedHeroMedia=hero, recommendedGalleryMedia=gallery, downloads=['catalog-2026-bhs'],
        possibleRelatedProjects=[], factualNotes=notes, status='draft'))

solution('interactive-screens-retrofit', 'digital-retail', [3], 'Interaktivni ekrani i nadogradnja opreme', 'Interactive Screens / Retrofit', 'interaktivni-ekrani-retrofit',
'Postojeće police, vending aparate, frižidere i druge uređaje nadograđujemo ekranima i interaktivnim funkcijama.',
'Add screens and interactive functions to existing shelves, vending machines, refrigerators and other equipment.',
'''
Postojeća oprema. Potpuno novo iskustvo. Bez zamjene osnovne opreme stvaramo novu komunikacijsku i prodajnu platformu.

## Integracija prema uređaju
Ugradnju prilagođavamo konstrukciji, prostoru i napajanju. Ekran, nosači, elektronika, interfejs i sadržaj razvijaju se prema potrebama projekta.

## Sadržaj i interakcija
Video, animacije, meniji, uputstva i promotivne poruke mogu raditi samostalno ili kroz namjenski interaktivni softver. Touch ekran, senzor ili taster mogu pokretati video, audio, LED i mehaničke efekte. Sadržaj se ažurira lokalno ili daljinski, uz opcionu osnovnu analitiku.

## Od procjene do ugrađenog sistema
Proces počinje pregledom mjera, fotografija, konstrukcije i mogućnosti integracije. Slijede razvoj hardvera i softvera, transport, montaža, testiranje i korisnička obuka.

## Zatražite procjenu i ponudu
Pošaljite fotografije opreme, mjere i željene funkcije.
''', '''
Existing equipment. A new experience. We turn equipment already in use into a communication and sales platform without replacing its core structure.

## Integration around the equipment
Installation is adapted to the construction, available space and power supply. Screens, mounts, electronics, interfaces and content are developed around the project.

## Content and interaction
Video, animation, menus, instructions and promotional messages can run independently or through custom interactive software. Touch, sensors or buttons can trigger video, audio, LED lighting and mechanical effects. Content can be updated locally or remotely, with optional basic analytics.

## From assessment to installation
We begin with dimensions, photographs, construction details and integration options. Hardware and software development is followed by transport, installation, testing and user training.

## Request an assessment and quote
Send photographs of the equipment, dimensions and the functions you need.
''', 'p03-01', ['p03-02','p03-03'], 'p3 illustrations do not identify a commissioned client implementation; visible brands are not client records.')

solution('multimedia-screens', 'digital-retail', [4], 'Multimedijalni ekrani', 'Multimedia Screens', 'multimedijalni-ekrani',
'Ekran, kućište i namjenska aplikacija povezani u kompletan sistem za informisanje, interakciju i prikupljanje podataka.',
'Screens, enclosures and custom applications brought together for information, interaction and data collection.',
'''
Ekran je tek početak. Razvijamo kompletne sisteme u kojima su ekran, kućište i aplikacija prilagođeni stvarnoj namjeni: od prezentacije proizvoda i digitalnih vodiča do UX anketa, nagradnih igara i namjenskih sistema.

## Aplikacije i podaci
Ankete i ocjene obuhvataju uslugu, proizvod i ukupno korisničko iskustvo. Aplikacije mogu prikupljati podatke o interesovanju i potrošnji različitih proizvoda. Kvizovi, prijave, kuponi i interaktivne kampanje dopunjuju promotivnu primjenu.

## Primjene
Digitalni vodiči povezuju smještaj, gastronomiju, prevoz, mape i gradske sadržaje. Retail sistemi prikazuju kataloge, preporuke, upite i sadržaj prilagođen kupcu. Razvijamo i redomate, parking sisteme, info kioske i druga rješenja po mjeri.

## Jedan tim za cijelo rješenje
Projektujemo kućište, biramo ekran, razvijamo UX aplikaciju, povezujemo sisteme i pripremamo sadržaj. Proces obuhvata namjenu, dizajn, razvoj, montažu, testiranje, obuku i podršku, uz mogućnost daljih nadogradnji.

## Zatražite koncept rješenja
Uređaj, funkcije i izgled prilagođavamo projektu.
''','''
The screen is only the beginning. We develop complete systems with screens, enclosures and applications tailored to their purpose, from product presentations and digital guides to customer experience surveys, promotional games and dedicated systems.

## Applications and data
Surveys and ratings cover service, products and the overall customer experience. Applications can collect information on product interest and consumption. Quizzes, registrations, coupons and interactive campaigns support promotional use.

## Applications in context
Digital guides bring together accommodation, dining, transport, maps and city information. Retail systems present catalogs, recommendations, enquiries and relevant content. We also develop queue management systems, parking systems, information kiosks and other custom solutions.

## One team for the complete system
We design the enclosure, select the screen, develop the application, connect systems and prepare content. The process covers purpose, design, development, installation, testing, training and support, with room for future upgrades.

## Request a solution concept
The device, functions and appearance are adapted to your project.
''', 'p04-02', ['p04-03','p04-01'], 'No measured business outcomes or named client implementations on p4.')

solution('retail-media-screens', 'digital-retail', [5], 'Retail Media ekrani', 'Retail Media Screens', 'retail-media-ekrani',
'Povezani LED ekrani i centralizovano upravljanje kampanjama duž kupčevog puta kroz prodajni prostor.',
'Connected LED screens and centrally managed campaigns along the customer journey through retail spaces.',
'''
Prodajni prostor postaje digitalni medij. Postavljamo i povezujemo LED ekrane od ulaza i kasa do akcijskih zona i rashladnih vitrina. Centralizovano upravljanje omogućava izmjenu internih i partnerskih kampanja, a oglasni prostor može biti dodatna poslovna mogućnost.

## Tri modela saradnje
Prodaja obuhvata kupovinu opreme uz instalaciju, povezivanje i podršku. Rentanje obuhvata mjesečni najam ekrana, upravljanja i tehničke podrške. Katalog opisuje i partnerski model: Dev Studio obezbjeđuje opremu, a reklamni prostor dijeli se 50/50. Konkretan model dogovara se za lokaciju i obim mreže.

## Od pilot lokacije do aktivne mreže
Definišemo pozicije, obim i testni period, zatim montiramo i povezujemo opremu. Pripremaju se sadržaj, termini i oglasni paketi, uz evidenciju emitovanja i optimizaciju.

## Ekrani, sadržaj i podrška
Usluga može obuhvatiti opremu, upravljanje mrežom, kampanje i tehničku podršku, uz moguću integraciju sa POS sistemima, senzorima i analitikom. Pozicije uključuju ulaze, kase, akcijske zone, frižidere, izloge, prolaze, info pultove i parking.

## Zatražite pilot koncept
Pozicije, model saradnje i obim mreže prilagođavamo klijentu.
''','''
The retail space becomes a digital medium. We install and connect LED screens from entrances and checkouts to promotional areas and refrigerated displays. Central management supports changing in-house and partner campaigns; advertising space can provide an additional business opportunity.

## Three ways to work together
Purchase includes equipment, installation, connectivity and support. Rental covers a monthly package of screens, management and technical support. The catalog also describes a partnership in which Dev Studio supplies the equipment and advertising space is split 50/50. The arrangement is agreed for the location and network scope.

## From pilot location to active network
We define positions, scope and a trial period, then install and connect the equipment. Content, schedules and advertising packages are prepared alongside playback reporting and optimization.

## Screens, content and support
The service can cover equipment, network management, campaigns and technical support, with possible POS, sensor and analytics integrations. Locations include entrances, checkouts, promotional areas, refrigerators, windows, aisles, information desks and parking areas.

## Request a pilot concept
Screen positions, the collaboration model and network size are tailored to the client.
''', None, ['p05-01','p05-04','p05-02'], '50/50 refers to advertising SPACE, not revenue, profit or ROI. Confirm current commercial terms before publication. p5 visuals look synthetic; gallery concepts only, no suitable non-concept hero available.')

solution('smart-pos-shelf', 'digital-retail', [6], 'Pametna POS polica', 'Smart POS Shelf', 'pametna-pos-polica',
'Modularna POS polica koja povezuje proizvod, ekran, svjetlo i opcione interaktivne funkcije.',
'A modular POS shelf combining product presentation, a screen, lighting and optional interactive functions.',
'''
Polica koja ne čeka da bude primijećena. Pokret, svjetlo i sadržaj na ekranu predstavljaju proizvod na prodajnom mjestu. Dizajn, brending i konfiguracija prilagođavaju se proizvodu i prostoru, uz modularnu i višekratnu upotrebu.

## Osnovna konfiguracija
Samostojeća polica dolazi u maloj izvedbi V 140 × Š 60 × D 40 cm ili standardnoj V 180 × Š 60 × D 40 cm. Tehnička tabela navodi ekran od 19 inča i samostalni reklamni plejer / USB reprodukciju fotografija, videa i animacija. Ekran i konačna konfiguracija mogu se prilagoditi projektu. Broj i raspored polica zavise od proizvoda.

## Mogućnosti nadogradnje
Osnovu čine modularna konstrukcija, ekran, USB reprodukcija i brending. Opcije uključuju pokret, programirano ponašanje, senzore, naprednu rasvjetu, posebne dimenzije, raspored polica, interaktivni ekran i namjensku elektroniku.

## Model saradnje
Kupovina je namijenjena stalnim lokacijama. Iznajmljivanje obuhvata fleksibilan period, pripremu i podršku za kampanje. Izrada po narudžbi omogućava novu konstrukciju i funkcije.

## Zatražite koncept i ponudu
Pošaljite proizvod, cilj kampanje i približne mjere prostora.
''','''
A shelf designed to be noticed. Movement, light and on-screen content present the product at the point of sale. Design, branding and configuration are tailored to the product and space, using a modular, reusable structure.

## Base configuration
The freestanding shelf is offered in a small version, H 140 × W 60 × D 40 cm, and a standard version, H 180 × W 60 × D 40 cm. The specification lists a 19-inch screen and a standalone advertising player / USB playback for photographs, video and animation. The screen and final configuration can be adapted to the project. Shelf quantity and arrangement depend on the product.

## Upgrade options
The base combines a modular structure, screen, USB playback and branding. Options include movement, programmed behavior, sensors, advanced lighting, custom dimensions and shelf arrangements, an interactive screen and dedicated electronics.

## Ways to work together
Purchase suits permanent locations. Rental offers a flexible period with preparation and support for campaigns. Custom development can introduce a new structure and functions.

## Request a concept and quote
Send the product, campaign objective and approximate space dimensions.
''', 'p06-05', ['p06-02','p06-06'], 'User override applied: obsolete tier classification is excluded from both locales and import fields. Capabilities and collaboration models remain. 19-inch base screen versus screen-by-request is preserved as standard versus customization, not contradictory fixed promises. Standalone shelf images match products in the visible final composite; underlying obsolete text is not used.')

solution('brand-activations', 'brand-experiences', [12], 'Brend aktivacije', 'Brand Activations', 'brend-aktivacije',
'Brendirane igre i funkcionalne zone za festivale, koncerte, sportske događaje i promocije.',
'Branded games and useful event zones for festivals, concerts, sports events and promotions.',
'''
Projektujemo, izrađujemo i iznajmljujemo opremu za događaje. Od igre i takmičenja do punjenja telefona, zonu prilagođavamo brendu, prostoru i trajanju kampanje.

## Igre i korisne zone
Katalog prikazuje veliku igru 4 in a Row, brendirani stoni fudbal i punjače za telefone. Giant Pong i Cornhole prikazani su kao koncepti, a ne kao dokaz realizovanih instalacija.

## Od ideje do događaja
Koncept i dizajn obuhvataju izbor igre, dimenzije i vizuelni identitet. Izrada i brending povezuju konstrukciju, štampu i završnu obradu. Rental i logistika obuhvataju najam, transport, montažu i preuzimanje.

## Primjena
Zone se mogu prilagoditi festivalima, koncertima, sportu i promocijama u otvorenim i zatvorenim prostorima. Jedan događaj može povezati igru, punjenje uređaja i više brendiranih tačaka kontakta.

## Zatražite koncept brend aktivacije
Izrada, prodaja ili rental prema projektu.
''','''
We design, build and rent equipment for events. From games and competitions to phone charging, each zone is tailored to the brand, space and campaign duration.

## Games and useful event zones
The catalog shows a large 4 in a Row game, branded table football and phone charging stations. Giant Pong and Cornhole are presented as concepts, not as evidence of completed installations.

## From idea to event
Concept and design cover the choice of game, dimensions and visual identity. Production and branding bring together construction, printing and finishing. Rental and logistics include hire, transport, installation and collection.

## Applications
Zones can be adapted to festivals, concerts, sporting events and promotions, indoors or outdoors. A single event can connect games, device charging and several branded points of interaction.

## Request a brand activation concept
Custom production, purchase or rental to suit the project.
''', 'p12-01', ['p12-03','p12-04','p12-02','p12-05'], 'Giant Pong and Cornhole are explicitly tagged KONCEPT on p12. AI origin is unspecified; gallery images retain conceptual disclosures. Brand presence does not prove a direct client relationship. The phone charger is only 173px wide: supplementary gallery detail, never hero.')

solution('360-video-platforms', 'brand-experiences', [14,15,16], '360 Video platforme', '360 Video Platforms', '360-video-platforme',
'Kompaktna 360 video platforma i 360 Sky Studio za događaje, promocije i brend aktivacije.',
'A compact 360 video platform and 360 Sky Studio for events, promotions and brand activations.',
'''
Od malih grupa do cijele scene. Dvije izvedbe omogućavaju da kamera kruži oko učesnika ili iznad grupe i scene.

## 360 Video platforma
Kompaktna postavka za do četiri osobe. Kamera kruži oko gostiju na postolju i stvara dinamičan video sa usporenim kadrovima i efektima. Platforma i grafički elementi mogu se brendirati.

## 360 Sky Studio
Katalog opisuje scenu prečnika 5 m za oko 20 osoba. Kamera kruži iznad grupe, scene ili vozila. Konstrukcija može biti otvorena ili sa panelima i brendiranom pozadinom. Vizuali Sky izvedbi služe za ilustraciju rješenja; stranice 15 i 16 izričito su AI-generisani konceptualni prijedlozi, a ne završeni događaji ili klijentski projekti.

## Model saradnje
Iznajmljivanje i realizacija mogu obuhvatiti transport, montažu, tehničku pripremu, brendirane elemente i scenu prilagođenu prostoru. Primjene uključuju proslave, promocije, sajmove, korporativne događaje, grupe, proizvode i automobile. Konačna izvedba zavisi od prostora i tehničkih mogućnosti.

## Zatražite termin i ponudu
Pošaljite datum, lokaciju i tip događaja.
''','''
From small groups to an entire scene. Two formats allow the camera to move around participants or above a group and its surroundings.

## 360 Video platform
A compact setup for up to four people. The camera circles guests on a platform to create dynamic video with slow-motion footage and effects. The platform and graphic elements can be branded.

## 360 Sky Studio
The catalog describes a 5 m diameter scene for around 20 people. The camera moves above a group, scene or vehicle. The structure can be open or fitted with panels and a branded backdrop. Sky visuals illustrate the proposed format; pages 15 and 16 are explicitly AI-generated conceptual proposals, not completed events or client projects.

## Collaboration model
Rental and delivery can cover transport, installation, technical preparation, branded elements and a scene adapted to the space. Applications include celebrations, promotions, fairs, corporate events, groups, products and cars. The final setup depends on the space and technical feasibility.

## Request availability and a quote
Send the date, location and type of event.
''', 'p14-01', ['p14-02','p15-01','p15-04','p15-02','p16-01','p16-02'], 'p14 capacities are catalog specifications, not verified installation counts or certified occupancy. p14 Sky composite is a disclosed visualization/diagram; p15–16 gallery concepts retain explicit AI captions. Addiko is only a concept brand, never a client.')

solution('interactive-promotional-games', 'entertainment', [13], 'Interaktivne promotivne igre', 'Interactive Promotional Games', 'interaktivne-promotivne-igre',
'Igre i uređaji za stalne lokacije, događaje i retail kampanje, sa aktivacijom prilagođenom namjeni.',
'Games and devices for permanent locations, events and retail campaigns, with activation tailored to their purpose.',
'''
Razvijamo i proizvodimo igre čiji se uređaj, brending, sadržaj i način aktivacije prilagođavaju cilju. Moguća je slobodna igra ili pokretanje skeniranjem računa, QR koda ili bona.

## Prodaja, izrada po narudžbi i rental
Za stalne lokacije nudimo gotov uređaj ili kompletno rješenje. Izrada po narudžbi obuhvata kućište, elektroniku, senzore i softver. Najam za kampanje povezuje brending, postavljanje i podršku. Primjeri primjene obuhvataju Kids Play, tematska kućišta i retail aktivaciju.

## Scan & Play
Kupac dobija kod nakon kupovine. Uređaj očitava QR kod ili barkod i pokreće igru prema definisanim pravilima. Rezultat može biti prikaz bodova, poruka ili kupon kampanje. Nagradne igre realizuju se prema dogovoru.

## Primjena
Izgled, sadržaj, trajanje i aktivaciju prilagođavamo brendu i lokaciji: drogerijama i retail lancima, tržnim centrima, sajmovima, promocijama i brend aktivacijama.

## Zatražite koncept promotivne igre
Prodaja, izrada po narudžbi ili rental.
''','''
We develop and manufacture games with devices, branding, content and activation tailored to the objective. They can offer free play or start when a receipt, QR code or voucher is scanned.

## Purchase, custom development and rental
Permanent locations can use a ready-made device or a complete system. Custom development covers enclosures, electronics, sensors and software. Campaign rental combines branding, installation and support. Applications include Kids Play, themed enclosures and retail activations.

## Scan & Play
The customer receives a code after a purchase. The device reads a QR code or barcode and starts the game according to defined rules. The result can be a score, message or campaign coupon. Prize games are developed by agreement.

## Applications
Appearance, content, duration and activation are adapted to the brand and location: drugstores and retail chains, shopping centers, fairs, promotions and brand activations.

## Request a promotional game concept
Purchase, custom development or rental.
''', 'p13-03', ['p13-01','p13-02'], 'dm is only an example of a suitable retail chain, not an identified client. Kraš/Domaćica lion p13-02 is a disclosed visualization, not a verified commission. Duplicate underlying paragraph on p13 is not repeated.')

solution('kids-play', 'entertainment', [13,17], 'Kids Play', 'Kids Play', 'kids-play',
'Originalni Dev Studio arcade sistem za djecu od 3 do 11 godina, sa oko 30 edukativnih i zabavnih igrica i offline radom.',
'An original Dev Studio arcade system for children aged 3–11, with around 30 educational and entertaining games and offline operation.',
'''
Domaća arkadna igra, original Dev Studio. Proizvedeno u Bosni i Hercegovini (Made in BiH). Kids Play je interaktivni arcade sistem za djecu od 3 do 11 godina. Oko 30 edukativnih i zabavnih igrica dostupno je u kontrolisanom digitalnom okruženju.

## Osnovne karakteristike
Samostojeći dječiji arcade cabinet koristi 24-inčni ekran na dodir, otporan na udarce. Radi potpuno samostalno bez internet veze i bez pristupa vanjskim online sadržajima. Može se koristiti sa sistemom za naplatu ili bez njega. Predviđen je za unutrašnje porodične prostore, tržne centre i igraonice. Sjedalice i uređenje mini zone dostupni su po zahtjevu.

## Od jednog aparata do Kids Play zone
Standard je kompaktna samostojeća jedinica. Duo zona povezuje dva aparata sa odvojenim ekranima i opcionalnim sjedenjem. Prilagođena izvedba omogućava vizuelno i sadržajno prilagođavanje lokaciji ili partneru.

## Model saradnje
Kupovinom aparat ostaje u vlasništvu kupca. Mogući su najam ili partnersko postavljanje po dogovoru, kao i prilagođena izvedba, sadržaj ili brendiranje.

## Zatražite ponudu i prijedlog postavljanja
Za jednu lokaciju ili mrežu objekata.
''','''
A locally developed arcade product, original to Dev Studio. Made in Bosnia and Herzegovina (Made in BiH). Kids Play is an interactive arcade system for children aged 3–11. Around 30 educational and entertaining games are available in a controlled digital environment.

## Core features
The freestanding children's arcade cabinet uses an impact-resistant 24-inch touchscreen. It works independently without an internet connection or access to external online content. It can be supplied with or without a payment system. It is intended for indoor family spaces, shopping centers and play centers. Seating and a small play-zone layout are available on request.

## From one cabinet to a Kids Play zone
The standard format is a compact freestanding unit. A Duo zone combines two cabinets with separate screens and optional seating. A custom version allows the appearance and content to be adapted to the location or partner.

## Ways to work together
Purchase gives the buyer ownership of the cabinet. Rental or a partnership placement can be agreed, alongside custom construction, content or branding.

## Request a quote and placement proposal
For a single location or a network of venues.
''', 'p17-01', ['p13-03','p17-03'], 'Final visible product information and explicit user-confirmed facts take precedence over older hidden text. p17-03 is a usable alternate photograph of the same product, independent of obsolete text layers; no venue or installation count inferred. No revenue, network size, safety certification or quantified impact resistance is claimed.')

solution('smart-interactive-models', 'custom-engineering', [10,11,13], 'Pametne interaktivne makete', 'Smart Interactive Models', 'pametne-interaktivne-makete',
'Makete po mjeri koje povezuju oblik, senzore, svjetlo, zvuk i opcione ekrane ili mehanički pokret.',
'Custom models combining physical form, sensors, lighting, sound and optional screens or mechanical movement.',
'''
Makete koje objašnjavaju i reaguju. Proizvod, lik, objekat ili proces pretvaramo u aktivnu prezentaciju, uz oblik, dimenzije i brending prema projektu.

## Tehničke mogućnosti
Konstrukcija može koristiti MDF, PVC/Forex, akril, metal i štampu. Aktivacija je moguća senzorom pokreta, tasterom ili touch ekranom. Reakcije uključuju LED, audio, video i programirane sekvence. Ekran i namjenski softver su opcioni, a mehanički pokreti i fizički efekti razvijaju se po potrebi. Napajanje je 220 V ili baterijsko, zavisno od izvedbe.

## Nivoi interakcije
Svjetlo i audio mogu se aktivirati senzorom. Interaktivna izvedba povezuje senzor, taster ili ekran sa definisanim sekvencama. Potpuno prilagođena izvedba može uključiti softver, posebnu mehaniku i scenografiju.

## Model saradnje i primjena
Kupovina odgovara stalnim postavkama, showroomima, muzejima i edukaciji. Najam je moguć za kampanje i sajmove, uz pripremu sadržaja i podršku. Razvoj po narudžbi objedinjuje dizajn, konstrukciju, elektroniku, audio, softver i brending.

## Stvarne izvedbe i koncepti
Stranica 10 prikazuje stvarne Dev Studio izvedbe. Kuvar, konobar sa digitalnim menijem i Barni maskota sa stranice 11 su AI-generisani konceptualni prijedlozi, a ne realizovani projekti.

## Zatražite koncept i ponudu
Pošaljite ideju, cilj prezentacije i planirani prostor.
''','''
Models that explain and respond. We turn a product, character, object or process into an active presentation, with form, dimensions and branding developed for the project.

## Technical possibilities
Construction can use MDF, PVC/Forex, acrylic, metal and printed graphics. Activation can use a motion sensor, button or touchscreen. Responses include LED lighting, audio, video and programmed sequences. Screens and dedicated software are optional; mechanical movements and physical effects can be developed as required. Power is 220 V or battery-based, depending on the design.

## Levels of interaction
Light and audio can be sensor-activated. An interactive version connects sensors, buttons or a screen with defined sequences. Fully custom development can add software, special mechanisms and scenography.

## Collaboration and applications
Purchase suits permanent displays, showrooms, museums and educational settings. Rental is possible for campaigns and fairs, with content preparation and support. Custom development combines design, construction, electronics, audio, software and branding.

## Real implementations and concepts
Page 10 shows real Dev Studio implementations. The chef, digital-menu waiter and Barni mascot on page 11 are AI-generated conceptual proposals, not completed projects.

## Request a concept and quote
Send your idea, presentation objective and intended space.
''', 'p10-03', ['p13-01','p11-03','p11-02','p11-01'], 'p10 explicitly says STVARNE DEV STUDIO IZVEDBE. Real examples lead; p11 concepts follow with explicit AI captions. Do not identify the depicted person or infer a client from likeness/branding. No features assigned to an individual example without confirmation.')

solution('custom-interactive-systems', 'custom-engineering', [18], 'Projekti i interaktivni sistemi po narudžbi', 'Custom Projects / Custom Interactive Systems', 'interaktivni-sistemi-po-narudzbi',
'Razvoj pojedinačnih uređaja, projektorskih, touch, senzorskih i mehaničkih igara prilagođenih prostoru.',
'Custom development of devices, projection, touch, sensor-based and mechanical games adapted to the space.',
'''
Razvijamo interaktivnu opremu i igre po mjeri za igraonice i zabavne prostore. Projektorske igre, touch ekrane, senzore i klasične igre u modernoj izvedbi prilagođavamo prostoru, namjeni i vizuelnom identitetu.

## Igre i sistemi
Interaktivni pod i zid povezuju senzorski sistem i sadržaje za igru. Touch rješenja obuhvataju aplikacije, ekrane i kućišta po mjeri. Mehaničke igre, uključujući 4 in a Row i Tic-Tac-Toe / iks-oks, mogu se izraditi od drveta, metala i pločastih materijala, u zidnoj ili samostojećoj izvedbi prema projektu.

## Od zahtjeva do instalacije
Definišemo namjenu, prostor i budžet, zatim izgled, dimenzije i način igre. Izrada povezuje mehaniku, elektroniku i softver, uz montažu, testiranje i podršku.

## Jedan uređaj ili interaktivna zona
Rješenja se prilagođavaju igraonicama, hotelima, restoranima, tržnim centrima, čekaonicama i događajima.

## Zatražite koncept uređaja
Dimenzije, izgled i funkcije prilagođavamo projektu.
''','''
We develop custom interactive equipment and games for play centers and entertainment spaces. Projection games, touchscreens, sensors and contemporary versions of classic games are adapted to the space, purpose and visual identity.

## Games and systems
Interactive floors and walls combine sensing systems with game content. Touch solutions cover custom applications, screens and enclosures. Mechanical games, including 4 in a Row and Tic-Tac-Toe, can use wood, metal and sheet materials, in wall-mounted or freestanding versions to suit the project.

## From requirements to installation
We define the purpose, space and budget, then the appearance, dimensions and interaction. Production combines mechanics, electronics and software, followed by installation, testing and support.

## One device or an interactive zone
Solutions can be adapted to play centers, hotels, restaurants, shopping centers, waiting areas and events.

## Request a device concept
Dimensions, appearance and functions are tailored to the project.
''', 'p18-03', ['p18-02','p18-01'], 'p18 images are illustrative; origin/realization not verified. Projection image is not evidence of a Dev Studio installation.')

solution('impressive-custom-shelves', 'production', [7,8,9], 'Impresivne police po mjeri', 'Impressive Custom Shelves', 'impresivne-police-po-mjeri',
'Prodajne i promotivne police čiji su oblik, materijali, brending i raspored prilagođeni proizvodu i prostoru.',
'Retail and promotional shelves with form, materials, branding and arrangement tailored to the product and space.',
'''
Proizvod u centru pažnje. Razvijamo police prilagođene brendu, proizvodu i prostoru. Oblik, materijali, dimenzije i završna obrada definišu se za svaki projekat.

## Konstrukcija i materijali
Samostojeća, zidna, pultna ili modularna izvedba bira se prema proizvodu, kapacitetu i prostoru. Mogu se kombinovati drvo, metal, plastika, pleksiglas, kompozitne ploče i završne obrade usklađene s konceptom.

## Brending kao dio konstrukcije
Posebni oblici, tematski detalji i raspored polica povezuju se sa bojama, grafikama, 3D elementima, gravurom i štampom. Police mogu služiti trgovinama, sajmovima, kampanjama i brend aktivacijama.

## Od koncepta do postavljene police
Idejno rješenje polazi od mjera, proizvoda, brenda i namjene. Slijede konstrukcija, obrada i brendiranje, zatim isporuka, montaža i završna provjera.

## Konceptualni prijedlozi
Primjeri za Einhell, Plazmu, Hell, Kraš Bajaderu, Patelinu i Tikveš na stranicama 7 i 8 su izričito označeni kao AI-generisani konceptualni prijedlozi. Ne predstavljaju završene klijentske projekte. Konačan izgled prilagođava se proizvodu, prostoru, tehničkim mogućnostima i brendu.

## Zatražite koncept i ponudu
Pošaljite proizvod, mjere prostora i željeni rok.
''','''
The product takes center stage. We develop shelves around the brand, product and space. Form, materials, dimensions and finish are defined for each project.

## Structure and materials
Freestanding, wall-mounted, countertop or modular designs are selected around the product, capacity and space. Wood, metal, plastic, acrylic, composite boards and finishes can be combined to suit the concept.

## Branding within the structure
Distinctive shapes, themed details and shelf arrangements work with colors, graphics, three-dimensional elements, engraving and printing. Shelves can serve shops, fairs, campaigns and brand activations.

## From concept to installed shelf
The concept begins with dimensions, products, brand and purpose. Construction, processing and branding are followed by delivery, installation and final checks.

## Conceptual proposals
The Einhell, Plazma, Hell, Kraš Bajadera, Patelina and Tikveš examples on pages 7 and 8 are explicitly identified as AI-generated conceptual proposals. They are not completed client projects. The final appearance is adapted to the product, space, technical feasibility and brand.

## Request a concept and quote
Send the product, space dimensions and target deadline.
''', 'p09-03', ['p09-01','p09-02','p07-02','p07-01','p07-03','p08-03','p08-02','p08-01'], 'User grouping Production retained despite catalog grouping. Bavaria is presented as product visualization; the six p7–8 concepts carry explicit AI disclosures. Carroten is a physical product example, not an asserted Dev Studio client commission.')

solution('custom-furniture-equipment', 'production', [19], 'Mobilijar i oprema po mjeri', 'Custom Furniture & Equipment', 'mobilijar-i-oprema-po-mjeri',
'Mobilijar, dekorativne pregrade i funkcionalna oprema od metala, drveta i kombinovanih materijala.',
'Furniture, decorative partitions and functional equipment in metal, wood and combined materials.',
'''
Projektujemo i izrađujemo klupe, stolice, stolove, ormariće, dekorativne police i pregrade sa zelenilom. Namjena, prostor i vizuelni identitet određuju rješenje.

## Konstrukcija prema upotrebi
Dimenzije, nosivost, način korištenja i detalji definišu se za svaki proizvod. Materijali i završna obrada prilagođavaju se unutrašnjim ili spoljašnjim uslovima.

## Mobilijar i posebna oprema
Klupe, stolice i stolovi mogu se koristiti u javnim, poslovnim, ugostiteljskim i privatnim prostorima. Police sa zelenilom namijenjene su kafićima, restoranima, hotelima i kancelarijama. Ormarići i posebni elementi razvijaju se za punjenje telefona, odlaganje i druge namjene.

## Od skice do završenog proizvoda
Koncept obuhvata namjenu, mjere, materijale i izgled. Izrada povezuje obradu, zavarivanje, sklapanje i završnu obradu. Realizacija uključuje transport, postavljanje i završnu provjeru.

## Zatražite koncept i ponudu
Pošaljite skicu, mjere prostora i željenu namjenu.
''','''
We design and build benches, chairs, tables, cabinets, decorative shelves and planted partitions. Purpose, space and visual identity shape the solution.

## Construction around use
Dimensions, load requirements, use and details are defined for each product. Materials and finishes are selected for indoor or outdoor conditions.

## Furniture and dedicated equipment
Benches, chairs and tables can serve public, commercial, hospitality and private spaces. Planted shelving suits cafés, restaurants, hotels and offices. Cabinets and special elements are developed for phone charging, storage and other purposes.

## From sketch to finished product
The concept defines purpose, dimensions, materials and appearance. Production connects machining, welding, assembly and finishing. Delivery includes transport, installation and final checks.

## Request a concept and quote
Send a sketch, dimensions of the space and intended use.
''', 'p19-02', ['p19-04','p19-03'], 'Imperial is visible on equipment but no direct client relationship is stated. No numeric load ratings supplied.')

solution('custom-manufacturing', 'production', [20], 'Proizvodnja po narudžbi', 'Custom Manufacturing', 'proizvodnja-po-narudzbi',
'CNC obrada, lasersko rezanje, zavarivanje, sklapanje i završna obrada za pojedinačne proizvode, prototipe i serije.',
'CNC machining, laser cutting, welding, assembly and finishing for individual products, prototypes and production runs.',
'''
Jedan komad, prototip ili serija. Izrađujemo proizvode prema skici, uzorku ili tehničkoj dokumentaciji, povezujući CNC glodalicu, CNC laser, zavarivanje, sklapanje i završnu obradu.

## Tehnička priprema i obrada
Razrađujemo dimenzije, spojeve i materijale. Rezanje, graviranje, bušenje, oblikovanje, spajanje i sklapanje objedinjeni su u procesu prema projektu.

## Materijali i završna izrada
Obrađujemo metal, drvo, plastiku i pleksiglas, uključujući MDF, šperploču, kompozite i kombinacije po zahtjevu. Završetak može uključiti zavarivanje, brušenje, farbanje, sklapanje i pripremu za montažu.

## Od upita do proizvoda
Priprema počinje namjenom, količinom, mjerama i materijalima. Slijede precizna izrada i dorada, zatim kontrola, pakovanje, transport ili montaža.

## Pošaljite skicu i zatražite ponudu
Navedite količinu, materijal, dimenzije i željeni rok.
''','''
One item, a prototype or a production run. We manufacture from a sketch, sample or technical documentation, bringing together CNC routing, CNC laser cutting, welding, assembly and finishing.

## Technical preparation and processing
We develop dimensions, joints and material choices. Cutting, engraving, drilling, shaping, joining and assembly are combined around the project.

## Materials and finishing
Materials include metal, wood, plastics and acrylic, as well as MDF, plywood, composites and combinations specified for the project. Finishing can include welding, sanding, painting, assembly and preparation for installation.

## From enquiry to finished product
Preparation starts with purpose, quantity, dimensions and materials. Production and refinement are followed by inspection, packing, transport or installation.

## Send a sketch and request a quote
Include the quantity, material, dimensions and target deadline.
''', 'p20-02', ['p20-03','p20-04'], 'No machines, tolerances, batch capacities or material thicknesses invented. Bespoke award shown on p20 is a manufactured object, not an award WON by Dev Studio.')

# id -> clean stem, classification, solution, safe as Dev Studio realization,
# selected for this reviewed draft plan, notes. Import eligibility does not imply
# completed work: disclosed concepts and renders may illustrate Solutions.
ASSETS = {
'p03-01': ('retrofit-retail-shelf','real_product',0,False,True,'Photographic product cutout; execution and brand relationship unverified.'),
'p03-02': ('retrofit-refrigerator','real_product',0,False,True,'Product illustration; screen retrofit may be composited. Not client evidence.'),
'p03-03': ('retrofit-vending-machine','product_render',0,False,True,'Illustrative device with screen; rendering/compositing inferred, provenance unconfirmed.'),
'p04-01': ('multimedia-retail-display','real_product',1,False,True,'Product cutout, small native width; attribution unconfirmed.'),
'p04-02': ('multimedia-tourism-totem','real_product',1,False,True,'Product cutout; image does not prove an installed location.'),
'p04-03': ('multimedia-dual-screen','real_product',1,False,True,'Product cutout; commission unconfirmed.'),
'p05-01': ('retail-media-entrance-concept','ai_concept',2,False,True,'Synthetic-looking scene; AI classification is conservative visual inference, not explicit PDF disclosure.'),
'p05-02': ('retail-media-refrigeration-concept','ai_concept',2,False,True,'Generic Brand Store scene with synthetic features; provenance review required.'),
'p05-04': ('retail-media-checkout-concept','ai_concept',2,False,True,'Synthetic-looking Brand Store checkout; no verified location/client.'),
'p06-02': ('smart-pos-yellow-shelf-visualization','product_render',3,False,True,'Standalone yellow shelf matches the visible final composite. Image only; obsolete underlying text and tier labels are excluded.'),
'p06-05': ('smart-pos-red-product-shelf','real_product',3,False,True,'Clean photographic red shelf cutout, also visible in the final composite. Product example, not proof of a commissioned client project.'),
'p06-06': ('smart-pos-shelf-configurations','product_render',3,False,True,'Visible final composite combines a rendered-looking yellow shelf and photographic red shelf. Treat composite as illustration.'),
'p07-01': ('plazma-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p7; brand is not a client.'),
'p07-02': ('einhell-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p7; brand is not a client.'),
'p07-03': ('hell-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p7; brand is not a client.'),
'p08-01': ('tikves-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p8; brand is not a client.'),
'p08-02': ('patelina-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p8; brand is not a client.'),
'p08-03': ('bajadera-shelf-ai-concept','ai_concept',10,False,True,'Explicit AI disclosure on p8; brand is not a client.'),
'p09-01': ('bavaria-shelf-empty-visualization','product_render',10,False,True,'Render-like empty shelf; p9 has no explicit AI note. Do not assume realization.'),
'p09-02': ('bavaria-shelf-stocked-visualization','product_render',10,False,True,'Render-like stocked variant; not proof of client work.'),
'p09-03': ('carroten-promotional-shelf','real_product',10,False,True,'Photographic shelf likely physical; production attribution/client status requires confirmation.'),
'p10-03': ('dev-studio-interactive-models','real_product',8,True,True,'p10 explicitly labels these STVARNE DEV STUDIO IZVEDBE. Composite of two real examples; no client or personal identity inferred.'),
'p11-01': ('barni-mascot-ai-concept','ai_concept',8,False,True,'Explicit AI disclosure on p11; not a Barni client project.'),
'p11-02': ('waiter-menu-ai-concept','ai_concept',8,False,True,'Explicit AI disclosure on p11.'),
'p11-03': ('chef-model-ai-concept','ai_concept',8,False,True,'Explicit AI disclosure on p11.'),
'p12-01': ('jelen-table-football','real_product',4,False,True,'Physical product photo; no explicit commission or venue proof.'),
'p12-02': ('cornhole-concept','product_render',4,False,True,'Explicit KONCEPT label; AI authorship not specified. Disclosure mandatory.'),
'p12-03': ('madri-four-in-a-row','real_product',4,False,True,'Photographic product; no explicit client attribution.'),
'p12-04': ('jelen-phone-charging-station','real_product',4,False,True,'Only 173px wide; unsuitable as large hero. Attribution requires review.'),
'p12-05': ('giant-pong-concept','product_render',4,False,True,'Explicit KONCEPT label; AI authorship not specified. Disclosure mandatory.'),
'p13-01': ('interactive-figure-touchscreen','real_product',8,True,True,'Same figure identified as real Dev Studio execution on p10; p13 provides separate cutout.'),
'p13-02': ('domacica-mascot-illustration','product_render',6,False,True,'Highly rendered-looking branded mascot; unlabelled provenance. Not a verified Kraš commission.'),
'p13-03': ('kids-play-duo-cabinets','real_product',7,True,True,'Own product cross-supported by visible p17 on-location photo and original Dev Studio statement.'),
'p14-01': ('360-video-platform','real_product',5,False,True,'Product photograph/cutout; event deployment or manufacturer not explicitly proven.'),
'p14-02': ('360-sky-structure-visualization','diagram',5,False,True,'Composite scene visualization and open truss drawing; not an event photograph.'),
'p15-01': ('360-sky-elegant-ai-concept','ai_concept',5,False,True,'Explicit AI disclosure on p15.'),
'p15-02': ('360-sky-birthday-ai-concept','ai_concept',5,False,True,'Explicit AI disclosure on p15.'),
'p15-04': ('360-sky-wedding-ai-concept','ai_concept',5,False,True,'Explicit AI disclosure on p15.'),
'p16-01': ('360-sky-corporate-ai-concept','ai_concept',5,False,True,'Explicit AI disclosure on p16.'),
'p16-02': ('360-sky-addiko-ai-concept','ai_concept',5,False,True,'Explicit AI disclosure on p16; Addiko Bank is not a supported client relationship.'),
'p17-01': ('kids-play-indoor-zone','real_photo',7,True,True,'Visible final p17 photograph; location name and installation date not stated.'),
'p17-03': ('kids-play-indoor-zone-alternate','real_photo',7,True,True,'Useful alternate photograph of the same Kids Play product. Image remains valid independently of older hidden text. No location, date or installation count inferred.'),
'p18-01': ('interactive-projection-illustration','ai_concept',9,False,True,'Synthetic-looking illustrative scene; origin not explicitly disclosed. Not installation evidence.'),
'p18-02': ('custom-tic-tac-toe','product_render',9,False,True,'Product visualization; not evidence of a completed installation.'),
'p18-03': ('custom-four-in-a-row','product_render',9,False,True,'Product visualization; not evidence of a completed installation.'),
'p19-02': ('phone-charging-lockers','real_product',11,False,True,'Photographic equipment with Imperial branding; direct commission not stated.'),
'p19-03': ('planted-shelving-visualization','product_render',11,False,True,'Illustrative furniture with no realized location or provenance.'),
'p19-04': ('metal-wood-table-chairs','real_product',11,False,True,'Product photograph/cutout; maker and commission unconfirmed.'),
'p20-02': ('decorative-partition-doors','real_product',12,False,True,'Product cutout in service portfolio; verify fabrication attribution.'),
'p20-03': ('decorative-metal-table','real_product',12,False,True,'Product cutout in service portfolio; verify fabrication attribution.'),
'p20-04': ('custom-award-object','product_render',12,False,True,'Object illustration; never an award received by the company.'),
}

def lexical(body):
    children = []
    for block in body.split('\n\n'):
        # A Markdown heading ends at the first newline, even without a blank line.
        parts = block.split('\n', 1) if block.startswith('## ') else [block]
        for part in parts:
            heading = part.startswith('## ')
            text = part[3:] if heading else part
            if not text.strip(): continue
            node = {'type': 'heading' if heading else 'paragraph', 'version': 1, 'direction': 'ltr', 'format': '', 'indent': 0,
                    'children': [{'type': 'text', 'version': 1, 'text': text, 'format': 0, 'detail': 0, 'mode': 'normal', 'style': ''}]}
            if heading: node['tag'] = 'h2'
            children.append(node)
    return {'root': {'type': 'root', 'version': 1, 'direction': 'ltr', 'format': '', 'indent': 0, 'children': children}}

extracted = json.loads((OUT / 'manifest/extracted-images.json').read_text(encoding='utf8'))
assets = []
by_original = {}
for a in extracted:
    base = a['id']
    if a['duplicateOf']:
        original = by_original[a['duplicateOf']]
        assets.append({**a, 'proposedCleanFilename': original['proposedCleanFilename'], 'classification': original['classification'],
            'relatedSolution': original['relatedSolution'], 'safeAsRealization': original['safeAsRealization'],
            'importEnabled': False, 'useful': False, 'proposedUsage': 'Excluded repeated embedded occurrence; canonical file used instead.',
            'notes': f"Byte-identical duplicate of {original['id']}.", 'conceptual': original['conceptual'], 'disclosure': original.get('disclosure')})
        continue
    if base in ASSETS:
        stem, classification, idx, safe, enabled, notes = ASSETS[base]
        related = SOLUTIONS[idx]['key']
        useful = True
    else:
        stem, classification, related, safe, enabled, useful = base+'-excluded', 'unsuitable', None, False, False, False
        notes = 'Near-identical red shelf variant with inferior background; clean p06-05 is selected. Archive only.'
        if base.startswith('p01-') and base != 'p01-05':
            classification, notes = 'decorative', 'Brochure mini-page used in cover montage; not gallery media.'
        if base in ['p01-05','p07-04','p10-02']:
            classification, notes = 'logo', 'Repeated or older Dev Studio logo; existing site identity is preserved.'
        if base == 'p21-01':
            classification, notes = 'unsuitable', 'QR code/page furniture; excluded from gallery and CMS uploads.'
    extension = Path(a['file']).suffix
    clean = f'catalog-2026-{stem}-{a["sha256"][:12]}{extension}'
    disclosure = None
    conceptual = classification == 'ai_concept' or base in ['p12-02','p12-05']
    if conceptual:
        disclosure = {'bhs': 'Konceptualni vizual. Nije prikaz realizovanog Dev Studio projekta.',
                      'en': 'Conceptual visualization. Does not depict a completed Dev Studio project.'}
        if a['sourcePage'] in [7,8,11,15,16]:
            disclosure = {'bhs': 'Konceptualni vizual — AI-generisani prijedlog. Nije realizovani klijentski projekat. Konačan izgled zavisi od projekta i tehničkih mogućnosti.',
                          'en': 'Conceptual visualization — AI-generated proposal. Not a completed client project. Final appearance depends on the project and technical feasibility.'}
    elif classification in ['product_render','diagram']:
        disclosure = {'bhs': 'Vizualizacija proizvoda/rješenja iz kataloga. Nije potvrda realizovanog klijentskog projekta.',
                      'en': 'Product/solution visualization from the catalog. Does not establish a completed client project.'}
    elif useful and not safe:
        disclosure = {'bhs': 'Primjer proizvoda iz kataloga. Prikaz brenda ne potvrđuje klijentsku saradnju.',
                      'en': 'Product example from the catalog. Visible branding does not establish a client relationship.'}
    label = stem.replace('-', ' ')
    alt = {'bhs': f"{SOLUTIONS[idx]['locales']['bhs']['title']} - prikaz iz kataloga, str. {a['sourcePage']}" if useful else notes,
           'en': label.capitalize()}
    if conceptual:
        alt = {'bhs': 'Konceptualni vizual: '+alt['bhs'], 'en': 'Conceptual visualization: '+alt['en']}
    caption = disclosure or {'bhs': f"Dev Studio katalog 2026, str. {a['sourcePage']}.", 'en': f"Dev Studio catalog 2026, p. {a['sourcePage']}."}
    record = {**a, 'proposedCleanFilename': clean, 'classification': classification, 'relatedSolution': related,
              'safeAsRealization': safe, 'importEnabled': enabled, 'useful': useful,
              'proposedUsage': 'Disclosed Solution gallery concept; never hero or completed-work evidence.' if enabled and conceptual else 'Draft Solution hero/gallery illustration; no client relationship implied.' if enabled else 'Archive only; exclude from website gallery.',
              'notes': notes, 'conceptual': conceptual, 'disclosure': disclosure, 'alt': alt, 'caption': caption}
    if useful:
        (OUT / 'media/selected').mkdir(parents=True, exist_ok=True)
        target = OUT / 'media/selected' / clean
        shutil.copyfile(OUT / a['file'], target)
        record['importFile'] = 'media/selected/' + clean
    assets.append(record)
    by_original[a['originalExtractedFilename']] = record

for s in SOLUTIONS:
    for loc in s['locales'].values():
        loc['content'] = lexical(loc['body'])
    s['importHeroMedia'] = s['recommendedHeroMedia'] if s['recommendedHeroMedia'] and ASSETS[s['recommendedHeroMedia']][4] else None
    s['importGalleryMedia'] = [a for a in s['recommendedGalleryMedia'] if ASSETS[a][4]]

for a in assets:
    a['solutionUsages'] = [dict(solution=s['key'], role='hero' if s['importHeroMedia'] == a['id'] else 'gallery')
                          for s in SOLUTIONS if a['id'] == s['importHeroMedia'] or a['id'] in s['importGalleryMedia']]

coverage = [dict(solution=s['key'], hero=s['importHeroMedia'], gallery=s['importGalleryMedia'],
                 mediaCount=int(bool(s['importHeroMedia']))+len(s['importGalleryMedia'])) for s in SOLUTIONS]

CANDIDATES = [
 dict(key='kids-play-original-product', title='Kids Play - originalni Dev Studio proizvod', possibleClient=None, sourcePages=[13,17], confidence='high',
      evidence='p17 explicitly states original Dev Studio and shows cabinets in a real indoor location. It supports an own-product project, not a named client case study.',
      images=['p17-01','p13-03'], relatedSolution='kids-play', needsReview='Confirm project narrative and year. Do not infer venue, number of installations or revenue.'),
 dict(key='interactive-figures', title='Interaktivne figure po mjeri', possibleClient=None, sourcePages=[10,13], confidence='high',
      evidence='p10 explicitly labels the two figures STVARNE DEV STUDIO IZVEDBE. The touchscreen figure reappears individually on p13.',
      images=['p10-03','p13-01'], relatedSolution='smart-interactive-models', needsReview='Determine whether two separate projects; confirm commissioning party, dates and actual functions for each. No personal identity inferred.'),
 dict(key='carroten-shelf', title='Carroten promotivna polica', possibleClient='Carroten (brand named on p9; commissioning client unconfirmed)', sourcePages=[9], confidence='medium',
      evidence='Product appears photographed and p9 labels CARROTEN in custom production section; lacks explicit realization statement.', images=['p09-03'], relatedSolution='impressive-custom-shelves', needsReview='Confirm Dev Studio fabrication and permission/attribution before any Project record.'),
 dict(key='jelen-event-equipment', title='Brendirani stoni fudbal i punjač za telefone', possibleClient='Jelen (visible branding only)', sourcePages=[12], confidence='medium',
      evidence='Photographic-looking products in event equipment offer, no KONCEPT badge on these two items.', images=['p12-01','p12-04'], relatedSolution='brand-activations', needsReview='Confirm fabrication, venue, actual commissioning client and dates.'),
 dict(key='madri-four-in-a-row', title='Velika brendirana igra 4 in a Row', possibleClient='Madri (visible branding only)', sourcePages=[12], confidence='medium',
      evidence='Photographic-looking physical game, unlike explicitly marked concept games on same page.', images=['p12-03'], relatedSolution='brand-activations', needsReview='Confirm realization and client attribution.'),
 dict(key='phone-charging-lockers', title='Ormarići za punjenje telefona', possibleClient='Imperial (visible label, not proven client)', sourcePages=[19], confidence='medium',
      evidence='Physical equipment photograph in custom furniture section.', images=['p19-02'], relatedSolution='custom-furniture-equipment', needsReview='Confirm manufacturer/commission and whether brand may be named.'),
 dict(key='decorative-metalwork', title='Dekorativna vrata i metalni stolić', possibleClient=None, sourcePages=[20], confidence='medium',
      evidence='Product cutouts illustrate CNC/manufacturing capabilities; no named installation.', images=['p20-02','p20-03'], relatedSolution='custom-manufacturing', needsReview='Confirm which objects are real studio work and whether they belong to separate projects.'),
]
for s in SOLUTIONS:
    s['possibleRelatedProjects'] = [p['key'] for p in CANDIDATES if p['relatedSolution'] == s['key']]

source = ROOT / 'content-source/dev-studio-katalog-2026.pdf'
manifest = dict(formatVersion=1, packageKey='dev-studio-catalog-2026', approval='pending-human-review',
    source=dict(file='content-source/dev-studio-katalog-2026.pdf', pages=21, sha256=hashlib.sha256(source.read_bytes()).hexdigest()),
    policy=dict(defaultMode='dry-run', solutionStatus='draft', writeCollections=['media','solutions','downloads'],
                prohibitedWrites=['projects','stories','clients','homepage','site-settings'],
                conceptsAllowedInSolutionGalleries=True, conceptualHeroesAllowed=False,
                conceptDisclosureRequiredIn=['alt','caption','gallery.caption'], projectCandidatesReviewOnly=True,
                preserveExistingPublished=True, uploadAssetsWithoutDrafts=True),
    mediaCoverage=coverage,
    solutions=SOLUTIONS, assets=assets, projectCandidates=CANDIDATES, projects=[], stories=[], clients=[],
    downloads=[dict(key='catalog-2026-bhs', file='downloads/dev-studio-katalog-2026-bhs.pdf', sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
        filename='dev-studio-katalog-2026-bhs.pdf', locales={'bhs': {'title':'Dev Studio - Katalog proizvoda i rješenja 2026'},
        'en': {'title':'Dev Studio - Products & Solutions Catalog 2026 (BHS)'}}, category='catalog', language='bhs', year=2026,
        thumbnail=None, thumbnailRecommendation='Render original page 1 as a cover thumbnail after approval; no embedded clean cover image exists.',
        relatedSolution=None, relatedSolutions=[s['key'] for s in SOLUTIONS], featured=False,
        notes='One BHS PDF with localized record title, not an English PDF. All 13 Solutions.downloads point here; Downloads.relatedSolution is singular, so left unset.')],
    homepageRecommendations={
        'selectedWork.projects': 'After project review, consider kids-play-original-product and interactive-figures (max 4). No automatic mutation.',
        'whatWeBuild.categories': 'Not a relationship field: localized name array. Recommend the five required website groups only as a manual future editorial change; preserve existing entries now.',
        'ownProducts.products': 'Relationship to Projects, not Solutions. After approval create own-product Kids Play Project and link its ID. Do not put a Solution ID here.',
        'ownProducts.media': 'Recommend p17-01 after manual approval. Preserve existing headline/body/media now.',
        'latestFromTheStudio.stories': 'No dated reporting or final Story records supported. Consider future Behind the Build after interviewing the team; max 3. Preserve existing relationships.'},
    reviewIssues=[
        'Resolved by user override: Smart POS Shelf uses capability-led copy without obsolete tier classification in either locale. Source PDF and raw extraction remain untouched archival evidence, never importer content inputs.',
        'Resolved Kids Play text layers using final visible facts and user-confirmed Made in BiH, age 3–11, 24-inch touchscreen, around 30 games, offline use, optional payment and placement in malls/playrooms/family zones. Alternate p17 photograph contributes imagery only, not older copy.',
        '51 useful assets are selected for Solution illustration, including disclosed concepts. Product appearance or visible branding does not establish a Dev Studio client commission. All seven Project candidates remain review-only.',
        'p5 and p18 projection look synthetic but lack explicit AI wording. Classification is conservative inference requiring human provenance review.',
        'p12 Giant Pong/Cornhole marked concept, AI origin unspecified. p9 Bavaria and p13 Domaćica also require provenance review.',
        'p14 Sky is a diagram/visualization. 5m / around 20 people are catalog specifications, not completed implementation evidence or occupancy certification.',
        'Media and Downloads have public read access and no drafts. --write uploads become accessible; Solutions remain drafts. Review before any write.',
        'No English PDF supplied. Existing resources frontend filters by actual PDF language; BHS catalog will not appear as an English download.',
        'p21 named contacts and commercial p5 50/50 advertising-space split are source facts; do not auto-copy into Site Settings; confirm currency before publication.',
        'Some images are only 173-671px wide. Extraction preserves native resolution; request original photography later for cinematic heroes.',
        'Retail Media Screens has three useful conceptual gallery images but no suitable non-concept Hero Media. Leave hero empty until authentic media is supplied.'
    ])
(OUT / 'manifest/catalog-content.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
if previous:
    current_paths = {a.get('importFile') for a in assets}
    for old in previous['assets']:
        old_path = old.get('importFile')
        if old_path and old_path not in current_paths:
            target = (OUT / old_path).resolve()
            assert target.is_relative_to((OUT / 'media/selected').resolve())
            if target.exists():
                assert hashlib.sha256(target.read_bytes()).hexdigest() == old['sha256'], 'Refusing to remove edited generated asset'
                target.unlink()  # Only unchanged, superseded outputs from this builder.

unique = [a for a in assets if not a['duplicateOf']]
counts = Counter(a['classification'] for a in unique)
report = ['# Dev Studio catalog content review', '', 'Status: REVIEW PACKAGE ONLY. No database import, global update, publication or deployment performed.',
 'Source: `content-source/dev-studio-katalog-2026.pdf`; physical PDF pages 1–21. All pages reviewed as rendered pages and extracted text.',
 f"Source SHA-256: `{manifest['source']['sha256']}`", '',
 f"## Asset accounting\n\n{len(assets)} embedded occurrences; {len(unique)} unique original streams; {sum(a['useful'] for a in unique)} useful selected assets; {sum(a['importEnabled'] for a in unique)} unique Media files in the revised import plan. There are {sum(c['mediaCount'] for c in coverage)} Solution media references because two real product images are reused across related Solutions. Reuse never creates a second upload.",
 'Classification describes the asset, not proof of a client relationship. Uncertain photo/render/AI provenance is explicitly qualified. Logos, QR code, cover-page miniatures and two inferior near-duplicate shelf variants are retained in the audit only. Useful standalone shelves and the alternate Kids Play photograph are selected independently of obsolete hidden text.',
 '\n| Classification | All unique files | Selected uploads |\n|---|---:|---:|']
report += [f"| {k} | {counts.get(k,0)} | {sum(a['classification']==k and a['importEnabled'] for a in unique)} |" for k in ['real_photo','real_product','product_render','ai_concept','diagram','icon','logo','decorative','unsuitable']]
report += ['', '## The 13 Solutions', '', 'Website grouping follows the user instruction, not the catalog table-of-contents grouping. All content is prepared in BHS and English with real localized slugs and Lexical rich text. Full bilingual copy follows below. Hero and gallery selections below are actual import references, not held recommendations.', '', '| # | BHS / English | Group | Pages | Hero | Gallery | Media count |', '|---|---|---|---|---|---|---:|']
for i,s in enumerate(SOLUTIONS,1):
    report.append(f"| {i} | {s['locales']['bhs']['title']} / {s['locales']['en']['title']} | {s['solutionGroup']} | {s['sourcePages']} | {s['importHeroMedia'] or 'Missing: concepts only'} | {', '.join(s['importGalleryMedia']) or 'None'} | {coverage[i-1]['mediaCount']} |")
report += ['', 'Retail Media Screens is the only Solution without a suitable non-concept hero. The other 12 have selected photo/product/render heroes; some are modest-resolution catalog cutouts and should eventually be replaced by supplied original photography. Existing manually assigned heroes are preserved by the importer. Every Solution references the BHS catalog. All Project relationships remain review-only because Solutions.relatedProjects is a reverse join.', '', '## AI / concept controls',
 'Explicit AI: pages 7–8 (six branded shelf concepts), 11 (three smart models), 15–16 (five Sky concepts). These 14 visuals are never project evidence. Page 5 and the page 18 projection scene add four conservatively inferred AI concepts. Page 12 marks Giant Pong and Cornhole as concepts without specifying AI authorship: classified product_render with conceptual=true. Page 14 Sky drawing is a disclosed diagram, not real event photography.',
 'All 18 AI concepts and both explicitly labelled product concepts are enabled only for relevant Solution galleries. Their BHS/EN alt text, Media captions and gallery captions carry “Konceptualni vizual” / “Conceptual visualization”; explicitly AI-labelled pages also retain AI attribution. Concepts cannot be selected as heroes or Project candidates. Other renders/diagrams are disclosed as visualizations and photographs with unconfirmed commissions as catalog product examples. No brand image generates a Client record or a completed-project claim.',
 'The importer preserves existing human gallery captions and appends required disclosure if missing. Public Solution galleries already render gallery captions; this package does not alter frontend code. Media/Downloads have no draft status, so all enabled uploads become public only if a later reviewed write is authorized.', '', '## Resolved user overrides',
 'Smart POS Shelf: obsolete tier classification is absent from BHS/EN copy, manifest and import fields. Capabilities, technical detail and collaboration models are preserved. The unchanged source PDF and raw extraction are archival evidence and are not used to generate import payloads.',
 'Kids Play: original Dev Studio product, Made in BiH, ages 3–11, 24-inch touchscreen, around 30 educational/entertainment games, offline without external online content, optional payment and shopping-center/playroom/family-zone placement. Final visible facts and explicit user confirmation take precedence over older hidden text. The alternate photograph is used solely as valid product imagery.', '', '## Project candidates (review only)']
for p in CANDIDATES:
    report += [f"\n### {p['title']} ({p['confidence']})", f"Pages: {p['sourcePages']}; related Solution: `{p['relatedSolution']}`; images: {', '.join(p['images'])}.", f"Possible brand/client: {p['possibleClient'] or 'Not specified; do not invent.'}", p['evidence'], 'Review: '+p['needsReview']]
report += ['', 'No final Project records are in the write plan, including high-confidence candidates: this task prepares them for review. No low-confidence or AI item is promoted to a Project. Unsupported low-confidence ideas (retrofit branded devices, multimedia screens, retail-media scenes, Bavaria shelves, Domaćica mascot, 360 events, projector installations and furniture visualizations) are intentionally not proposed as realizations.', '', '## Download',
 '`catalog-2026-bhs`: Dev Studio - Katalog proizvoda i rješenja 2026 / Dev Studio - Products & Solutions Catalog 2026 (BHS). Category `catalog`, year 2026, language `bhs`. Byte-identical copy at `downloads/dev-studio-katalog-2026-bhs.pdf`. No English file is fabricated.',
 'Downloads has localized titles but a single actual language per file. A future English PDF requires a separate Download record. All 13 Solutions.downloads can reference this record; singular Downloads.relatedSolution stays empty. Cover recommendation: original page 1 render, reviewed before upload; no invented cover.', '', '## Homepage relationship recommendations']
report += [f'- **{k}**: {v}' for k,v in manifest['homepageRecommendations'].items()]
report += ['', '## Ambiguities requiring review'] + ['- '+x for x in manifest['reviewIssues']]
report += ['', '## Page-by-page coverage and exclusions',
 '- p1: cover, 2026 edition, integrated engineering promise; miniature brochure images excluded as decoration.',
 '- p2: complete development cycle and 13 catalog areas; no superlative marketing claims copied as measurable achievements.',
 '- p3–6: retrofit, multimedia, retail media and smart POS specifications, processes and CTAs retained.',
 '- p7–8: six AI shelf concepts selected for the custom-shelves gallery with bilingual conceptual/AI disclosures.',
 '- p9: custom shelf materials/processes retained; branded example attribution held.',
 '- p10: smart-model technical details and explicitly real examples retained.',
 '- p11: three AI models selected after real examples in the smart-models gallery, with bilingual conceptual/AI disclosures.',
 '- p12: activation service, real-looking equipment and two labelled concepts separated.',
 '- p13: promotional games and Scan & Play preserved; dm is only an example of a target retailer. Hidden duplicate text removed from proposed copy.',
 '- p14: both 360 formats and catalog dimensions/capacities preserved; Sky realization unconfirmed.',
 '- p15–16: five Sky AI concepts, including Addiko; no actual event/client claimed.',
 '- p17: final visible Kids Play facts take precedence over superseded text; both useful photographs are selected without importing older text.',
 '- p18: custom interactive systems retained as capability, not unnamed completed projects.',
 '- p19: furniture and charging equipment offer retained, no load ratings invented.',
 '- p20: manufacturing processes/materials retained; award object is not a company accolade.',
 '- p21: integrated process and contact CTA captured in source text; named contacts retained for manual review only; QR excluded.',
 '- No independent video files or standalone vector technical diagrams were embedded for website use. The useful Sky diagram is within a raster composite. Page furniture and process-layout arrows stay in rendered page evidence.',
 '', '## Complete asset audit', '', 'Original filenames, every occurrence, native dimensions, hashes and repeat references are in `manifest/catalog-content.json` and `manifest/extracted-images.json`. The following lists every unique asset.', '', '| ID / page | Clean filename | Class | Safe as realization | Import | Related Solution / usage and notes |', '|---|---|---|---|---|---|']
for a in unique:
    report.append(f"| {a['id']} / {a['sourcePage']} | {a['proposedCleanFilename']} | {a['classification']} | {a['safeAsRealization']} | {a['importEnabled']} | {a['relatedSolution'] or 'None'}: {a['notes']} |")
report += ['', '## Full bilingual proposed content']
for i,s in enumerate(SOLUTIONS,1):
    report += [f"\n### {i}. {s['locales']['en']['title']}", f"Source pages: {s['sourcePages']}. Notes: {s['factualNotes']}"]
    for lang, c in s['locales'].items():
        report += [f"\n#### {lang.upper()}: {c['title']}", f"Slug: `{c['slug']}`", c['shortDescription'], c['body'].replace('## ', '##### ')]
formatted = []
for line in report:
    formatted.append(line)
    if line.lstrip('\n').startswith('#') and '\n' not in line.strip(): formatted.append('')
(OUT / 'reports/catalog-content-review.md').write_text('\n'.join(formatted)+'\n', encoding='utf8')
print(json.dumps({'solutions':len(SOLUTIONS), 'uniqueAssets':len(unique), 'usefulAssets':sum(a['useful'] for a in unique),
                  'enabledMedia':sum(a['importEnabled'] for a in unique), 'classifications':dict(counts), 'projectCandidates':len(CANDIDATES)}))
