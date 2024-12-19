import artPic from "../../../assets/image/theme/Art-202405-Theme-Preview.jpg"
import artIcon from "../../../assets/image/theme/Art_theme_logo.png"
import brickheadzPic from "../../../assets/image/theme/Brickheadz-202406-Theme-Preview.jpg"
import brickheadzIcon from "../../../assets/image/theme/brickheadz_logo_pos_300w.png"
import creator3and1Pic from "../../../assets/image/theme/Creator3and1-202408-Theme-Preview.jpg"
import creator3and1Icon from "../../../assets/image/theme/creator3in1_logo_pos_300w.png"
import creatorExpertPic from "../../../assets/image/theme/CreatorExpert-202406-Theme-Preview.jpg"
import creatorExpertIcon from "../../../assets/image/theme/creator_expert_logo_pos_300w.png"
import DCPic from "../../../assets/image/theme/DC-202401-Theme-Preview.jpg"
import DCIcon from "../../../assets/image/theme/DC_logo_yellow_300w.png"
import disneyPic from "../../../assets/image/theme/Disney-202401-Theme-Preview.jpg"
import disneyIcon from "../../../assets/image/theme/disney_logo_pos_300w.png"
import friendsPic from "../../../assets/image/theme/Friends-202401-Theme-Preview.jpg"
import friendsIcon from "../../../assets/image/theme/friends2023-logo-600w.png"
import iconsPic from "../../../assets/image/theme/Icons-202410-Interest-Preview.jpg"
import iconsIcon from "../../../assets/image/theme/icons-logo-pos-600w.png"
import marvelPic from "../../../assets/image/theme/MARVEL-202411-Interest-Preview.jpg"
import marvelIcon from "../../../assets/image/theme/marvel_logo_pos_300w.png"
import starWarsPic from "../../../assets/image/theme/StarWars-202405-Theme-Preview.jpg"
import starWarsIcon from "../../../assets/image/theme/starWars_logo_black_stroke_300w.png"
import technicPic from "../../../assets/image/theme/Technic-202401-Theme-Preview.jpg"
import technicIcon from "../../../assets/image/theme/technic_logo_pos_100h.png"
import bumblebee from "../../../assets/image/MOC/Bumblebee_2018_Bumblebee_Alternate_Build.png"
import heavyCarrier from "../../../assets/image/MOC/Epoch-class_Heavy_Carrier.png"
import beestung from "../../../assets/image/MOC/MADSTOMP_XT_BEE-STUNG.png"
import petra from "../../../assets/image/MOC/Petra_The_Treasury.jpg"

const section = [
    {tittle:"Legos Under $500",section:"500"},
    {tittle:"Most Popular",section:"popular"},
]
const theme = [
    {name:"Art",picture:artPic,icon:artIcon},
    {name:"Brickheadz",picture:brickheadzPic,icon:brickheadzIcon},
    {name:"Creator 3 and 1",picture:creator3and1Pic,icon:creator3and1Icon},
    {name:"Creator Expert",picture:creatorExpertPic,icon:creatorExpertIcon},
    {name:"DC",picture:DCPic,icon:DCIcon},
    {name:"Disney",picture:disneyPic,icon:disneyIcon},
    {name:"Friends",picture:friendsPic,icon:friendsIcon},
    {name:"Icons",picture:iconsPic,icon:iconsIcon},
    {name:"Marvel",picture:marvelPic,icon:marvelIcon},
    {name:"Star Wars",picture:starWarsPic,icon:starWarsIcon},
    {name:"Technic",picture:technicPic,icon:technicIcon}
]

const mocItems = [
    {name:"Bumblebee 2018 Bumblebee Alternate Build",picture:bumblebee,
        description:["This modified version of an existing LEGO set offers a fresh take on Bumblebee from the 2018 movie. By creatively reusing parts, this alternate build delivers a unique transformation and design while staying true to Bumblebee's iconic yellow and black look. Perfect for fans looking to customize and expand their LEGO building experience."]},
    {name:"Epoch-class Heavy Carrier",picture:heavyCarrier,description:["A 1:4775 scale model of the Epoch-class Heavy Carrier first depicted in Halo: Warfleet."]},
    {name:"MADSTOMP XT BEE-STUNG",picture:beestung,
        description:["A modified worker mech alleged to be piloted by none other than “Invincible” Rummy - from an alternate timeline where he got into rehab and left his life of crime to become a beekeeper. Don't know what he needs the giant rocket launcher for, but hey",
                    `"They said rehab wouldn’t fix him. They were mostly right."`,
                    `"Rummy claims the launcher is for pests. The neighborhood disputes this."`,
                    `"Bringing peace and pollination with just a hint of explosive overkill."`,
                    `"The ultimate beekeeper's tool—if your bees are the size of small aircraft."`,
                    `"Retirement goals: raise bees, farm honey, test and compare explosive compounds in their armor penetrating capabilities. Rummy's closer than he should be."`,
                    `"No one understands the rockets. Not even Rummy. Especially not Rummy."`,
        `-So, I finally got my hands on set 76254 "Baby Rocket's Ship", and managed to incorporate it into a mech body.`]
    },
    {name:"Petra The Treasury",picture:petra,
        description:["To construct this architectural facade in this day and age would be extremely difficult.......to carve it out of solid rock would be unthinkable.",
        "The proportions are based on an architectural drawing of the front and cross sections plus hundreds of photos."]
    },
]


export {mocItems,theme,section}