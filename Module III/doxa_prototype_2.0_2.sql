CREATE DATABASE  IF NOT EXISTS `doxa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `doxa`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: doxa
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assessment_replies`
--

DROP TABLE IF EXISTS `assessment_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment_replies` (
  `idAssessment_Replies` int NOT NULL AUTO_INCREMENT,
  `idAssessments` int NOT NULL,
  `Question_Number` varchar(255) DEFAULT NULL,
  `Reply1` mediumtext,
  `Reply2` mediumtext,
  PRIMARY KEY (`idAssessment_Replies`)
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_replies`
--

LOCK TABLES `assessment_replies` WRITE;
/*!40000 ALTER TABLE `assessment_replies` DISABLE KEYS */;
INSERT INTO `assessment_replies` VALUES (143,2,'1','communicative','quite restrained and calm'),(144,2,'2','practical lessons','theoretical studies'),(145,2,'3','feelings to control your mind','the mind to control your feelings'),(146,2,'4','plan what and when you will do','just hit the road'),(147,2,'5','join the conversation','talk with each separately'),(148,2,'6','with people prone to fantasies','with realistic people'),(149,2,'7','sensitive person','reasonable person'),(150,2,'8','decide in advance that you will be at a certain meeting, party, etc.','decide at the last moment to be able to choose entertainment'),(151,2,'9','you introduce people to each other','you are introduced to others'),(152,2,'10','practical person','fictional or romantic person'),(153,2,'11','value feelings more than logic','value logic more than feelings'),(154,2,'12','coping with surprises and trying to quickly find solutions','following a carefully crafted plan'),(155,2,'13','have deep friendships with few people','have friendships with many people'),(156,2,'14','follow generally accepted standards and do not attract attention','are genuine that they don\'t care if they pay attention to them or not'),(157,2,'15','be too kind','not be kind enough'),(158,2,'16','disciplines you','reduces your performance'),(159,2,'17','will learn about events from their life quite late','usually know a lot of news about them'),(160,2,'18','is always full of new ideas','looks at the world soberly and realistically'),(161,2,'19','trust your feelings in choosing the best solution','trust your logic'),(162,2,'20','is right','depresses you'),(163,2,'21','can talk freely with almost any person at any time','don\'t always find what to say to a stranger'),(164,2,'22','unusual, original manner of presentation','when writers express their thoughts clearly'),(165,2,'23','feelings of people','rights of people'),(166,2,'24','when unforeseen situations arise and you have to work with mobilization of forces','when you work in the usual schedule'),(167,2,'25','when they first meet you','only when they get to know you better'),(168,2,'26','do it in a common way','invent your own way'),(169,2,'27','attachment','rationality'),(170,2,'28','to organize everything carefully before you start it','to find out everything you need in the process'),(171,2,'29','freely express your feelings','keep your feelings to yourself'),(172,2,'30','facts','ideas'),(173,2,'31','thoughts','feelings'),(174,2,'32','it\'s easier for you to plan your business','you have to adapt to this schedule'),(175,2,'33','cheerful','calm'),(176,2,'34','theory','practice'),(177,2,'35','convincing','touching'),(178,2,'36','prescribed','unplanned'),(179,2,'37','restrained','talkative'),(180,2,'38','theory','fact'),(181,2,'39','analyze','sympathize'),(182,2,'40','systematic','spontaneous'),(183,2,'41','calm','lively'),(184,2,'42','literal','figurative'),(185,2,'43','justice','mercy'),(186,2,'44','regular','random'),(187,2,'45','say','write'),(188,2,'46','dreamy','practical'),(189,2,'47','compassion','prudence'),(190,2,'48','impulse','decision'),(191,2,'49','sociable','closed'),(192,2,'50','produce','create'),(193,2,'51','benefit','good'),(194,2,'52','punctuality','improvisation'),(195,2,'53','party','theater'),(196,2,'54','prudent','charming'),(197,2,'55','decisive','faithful'),(198,2,'56','changing','constant'),(199,2,'57','more addicted person than others','less addicted'),(200,2,'58','execution','creativity'),(201,2,'59','principle','kind-hearted'),(202,2,'60','disciplined','informal'),(203,2,'61','often get bored','usually have a good time'),(204,2,'62','concrete','abstract'),(205,2,'63','peacemaker','judge'),(206,2,'64','swift','thorough'),(207,2,'65','make new friends constantly','deal with old friends'),(208,2,'66','build','invent'),(209,2,'67','soft','hard'),(210,2,'68','prefer to do everything at the last moment','find that leaving something for the end gets on your nerves'),(211,2,'69','one of the first to try it','little interest in it'),(212,2,'70','foundation','spire'),(213,2,'71','forgive','endure'),(214,2,'72','helps to work calmly','limits your freedom'),(215,2,'73','wrap it up for fun','find a decent way out of it only after a considerable time'),(216,2,'74','intuition','experience'),(217,2,'75','who','what'),(218,2,'76','you will most likely forget about it and remember much later','you usually record so as not to forget'),(219,2,'77','In most cases','Only when you let them know'),(220,2,'78','sign','symbol'),(221,2,'79','praise','criticism'),(222,2,'80','to routine','to constant change'),(223,2,'81','lead events','don\'t stop others from having fun as they want'),(224,2,'82','accept is it is','change'),(225,2,'83','cautious','gullible'),(226,2,'84','sacrifice time to paint what needs to be done and in what order','just dive into'),(227,2,'85','rather yes','probably not'),(228,2,'86','understandable','mysterious'),(229,2,'87','agree','argue'),(230,2,'88','to start early to have a reserve of time','that you can always develop crazy speed at the end'),(231,2,'89','calm','anxious'),(232,2,'90','to be original, live by your own rules','to follow generally accepted standards, traditions'),(233,2,'91','meek','persistent'),(234,2,'92','accurately list what exactly and for how long','probably list twice as many cases as you had time to do'),(235,2,'93','rather yes','probably not'),(236,2,'94','his foresight, intuition','his common sense'),(237,2,'95','insensible','unreasonable'),(238,2,'96','reassures you','bores you'),(239,2,'97','easy and nice','unpleasant duty'),(240,2,'98','see hidden opportunities in any situation','adapt to the situation'),(241,2,'99','always kind','always fair'),(242,2,'100','shares your standards and point of view','is an interesting person'),(243,2,'101','acts quickly without hesitation','ponders everything, sometimes too long'),(244,2,'102','would not call for significant changes in existing orders','would urge to decisively sweep away everything that does not meet the requirements of the day'),(245,2,'103','you often criticize, do not believe the word','you often think like others, believe in their rightness'),(246,2,'104','decisiveness','curiosity'),(247,2,'105','are easy to respond','easily annoyed'),(248,2,'106','observe','imagine'),(249,2,'107','restraint and efficiency','sensitivity and understanding'),(250,2,'108','always accurate, punctual','always full of new ideas'),(251,2,'109','show enthusiasm for action','tend to give preference to reflection'),(252,2,'110','rather yes','probably not'),(253,2,'111','doesn\'t matter to you','offends you'),(254,2,'112','what you think is right','as circumstances dictate'),(255,2,'113','rather yes','probably not'),(256,2,'114','argue your position','quickly jump to conclusions by skipping facts'),(257,2,'115','insist','keep relationship'),(258,2,'116','know how to plan and live according to plans','rarely plan, act on the situation'),(259,2,'117','written assignments','personal speeches'),(260,2,'118','whole','details'),(261,2,'119','honesty','tact'),(262,2,'120','it should be','it could be'),(263,2,'121','answer without thinking','are uncomfortable and think before answering'),(264,2,'122','that are immediate','which do not concern the current moment'),(265,2,'123','rather yes','probaly not'),(266,2,'124','understand','manage'),(267,2,'125','prefer concentration-intensive work','can\'t always focus for a long time on one task, subject'),(268,2,'126','is inclined to focus on obvious facts','sees options that others don\'t notice'),(269,2,'127','take emotional problems to heart','treat emotional problems as a hindrance in solving problems'),(270,2,'128','forget about time, carried away by solving problems','strive to complete some part and finish the work on time'),(271,2,'129','set your own standards where possible','more interested in how others do work'),(272,2,'130','at a steady pace','in fits, with lulls in front of them'),(273,2,'131','spend some time to build relationships','get along easily with others right away'),(274,2,'132','rather yes','probably not'),(275,2,'133','in reports','at meetings'),(276,2,'134','prefer to rely on your experience and knowledge','each time you rely on a new approach that requires new knowledge'),(277,2,'135','do not endure conflicts, it negatively affects efficiency','can work in adverse emotional conditions'),(278,2,'136','try not to miss anything in life','follow the chosen path'),(279,2,'137','work on one task for a long time','switch from task to task'),(280,2,'138','work','inspire'),(281,2,'139','enthusiastic','usually smooth and businesslike'),(282,2,'140','live in obedience to the current situation','build your life according to plan'),(283,2,'141','ask for more concrete examples','quickly grasp the meanings of words and characters'),(284,2,'142','memorize','reason');
/*!40000 ALTER TABLE `assessment_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `idAssessments` int NOT NULL AUTO_INCREMENT,
  `Assessment_Name` varchar(10000) NOT NULL,
  `Reply_Type` varchar(45) NOT NULL,
  `Question_Amount` int NOT NULL,
  `Q1` longtext,
  `Q2` longtext,
  `Q3` longtext,
  `Q4` longtext,
  `Q5` longtext,
  `Q6` longtext,
  `Q7` longtext,
  `Q8` longtext,
  `Q9` longtext,
  `Q10` longtext,
  `Q11` longtext,
  `Q12` longtext,
  `Q13` longtext,
  `Q14` longtext,
  `Q15` longtext,
  `Q16` longtext,
  `Q17` longtext,
  `Q18` longtext,
  `Q19` longtext,
  `Q20` longtext,
  `Q21` longtext,
  `Q22` longtext,
  `Q23` longtext,
  `Q24` longtext,
  `Q25` longtext,
  `Q26` longtext,
  `Q27` longtext,
  `Q28` longtext,
  `Q29` longtext,
  `Q30` longtext,
  `Q31` longtext,
  `Q32` longtext,
  `Q33` longtext,
  `Q34` longtext,
  `Q35` longtext,
  `Q36` longtext,
  `Q37` longtext,
  `Q38` longtext,
  `Q39` longtext,
  `Q40` longtext,
  `Q41` longtext,
  `Q42` longtext,
  `Q43` longtext,
  `Q44` longtext,
  `Q45` longtext,
  `Q46` longtext,
  `Q47` longtext,
  `Q48` longtext,
  `Q49` longtext,
  `Q50` longtext,
  `Q51` longtext,
  `Q52` longtext,
  `Q53` longtext,
  `Q54` longtext,
  `Q55` longtext,
  `Q56` longtext,
  `Q57` longtext,
  `Q58` longtext,
  `Q59` longtext,
  `Q60` longtext,
  `Q61` longtext,
  `Q62` longtext,
  `Q63` longtext,
  `Q64` longtext,
  `Q65` longtext,
  `Q66` longtext,
  `Q67` longtext,
  `Q68` longtext,
  `Q69` longtext,
  `Q70` longtext,
  `Q71` longtext,
  `Q72` longtext,
  `Q73` longtext,
  `Q74` longtext,
  `Q75` longtext,
  `Q76` longtext,
  `Q77` longtext,
  `Q78` longtext,
  `Q79` longtext,
  `Q80` longtext,
  `Q81` longtext,
  `Q82` longtext,
  `Q83` longtext,
  `Q84` longtext,
  `Q85` longtext,
  `Q86` longtext,
  `Q87` longtext,
  `Q88` longtext,
  `Q89` longtext,
  `Q90` longtext,
  `Q91` longtext,
  `Q92` longtext,
  `Q93` longtext,
  `Q94` longtext,
  `Q95` longtext,
  `Q96` longtext,
  `Q97` longtext,
  `Q98` longtext,
  `Q99` longtext,
  `Q100` longtext,
  `Q101` longtext,
  `Q102` longtext,
  `Q103` longtext,
  `Q104` longtext,
  `Q105` longtext,
  `Q106` longtext,
  `Q107` longtext,
  `Q108` longtext,
  `Q109` longtext,
  `Q110` longtext,
  `Q111` longtext,
  `Q112` longtext,
  `Q113` longtext,
  `Q114` longtext,
  `Q115` longtext,
  `Q116` longtext,
  `Q117` longtext,
  `Q118` longtext,
  `Q119` longtext,
  `Q120` longtext,
  `Q121` longtext,
  `Q122` longtext,
  `Q123` longtext,
  `Q124` longtext,
  `Q125` longtext,
  `Q126` longtext,
  `Q127` longtext,
  `Q128` longtext,
  `Q129` longtext,
  `Q130` longtext,
  `Q131` longtext,
  `Q132` longtext,
  `Q133` longtext,
  `Q134` longtext,
  `Q135` longtext,
  `Q136` longtext,
  `Q137` longtext,
  `Q138` longtext,
  `Q139` longtext,
  `Q140` longtext,
  `Q141` longtext,
  `Q142` longtext,
  `Q143` longtext,
  `Q144` longtext,
  `Q145` longtext,
  `Q146` longtext,
  `Q147` longtext,
  `Q148` longtext,
  `Q149` longtext,
  `Q150` longtext,
  `Q151` longtext,
  `Q152` longtext,
  `Q153` longtext,
  `Q154` longtext,
  `Q155` longtext,
  `Q156` longtext,
  `Q157` longtext,
  `Q158` longtext,
  `Q159` longtext,
  `Q160` longtext,
  `Q161` longtext,
  `Q162` longtext,
  `Q163` longtext,
  `Q164` longtext,
  `Q165` longtext,
  `Q166` longtext,
  `Q167` longtext,
  `Q168` longtext,
  `Q169` longtext,
  `Q170` longtext,
  `Q171` longtext,
  `Q172` longtext,
  `Q173` longtext,
  `Q174` longtext,
  `Q175` longtext,
  `Q176` longtext,
  `Q177` longtext,
  `Q178` longtext,
  `Q179` longtext,
  `Q180` longtext,
  `Q181` longtext,
  `Q182` longtext,
  PRIMARY KEY (`idAssessments`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments`
--

LOCK TABLES `assessments` WRITE;
/*!40000 ALTER TABLE `assessments` DISABLE KEYS */;
INSERT INTO `assessments` VALUES (1,'Personality Trait Score','1',181,'I\'m not one to be worried.','I am prone to overeating.','I prefer to spend my leisure time with others.','I take command.','I\'m constantly occupied.','I radiate happiness.','I\'m not a big fan of poetry.','I am skeptical of people.','I tell other people what they want to hear in order for them to do what I want.','Others\' needs are anticipated by me.','I feel I am superior than others.','I feel sorry for the homeless.','I keep everything in order.','I am a self-disciplined individual.','I act without thinking about what I\'m doing.','I like a well-executed con.','I enjoy owning items that make people take notice of me.','When I\'m feeling down, I try to be with someone else.','I am aware of other people\'s feelings.','I\'m talkative.','I aim to avoid public speaking whenever possible.','I am normally a very active person with a lot of energy.','I have patience with those that irritate me.','I am easily irritated.','I put a lot of pressure on myself to succeed.','I am not a fan of art.','I like learning about different nations and cultures.','I\'m thought to be a little strange.','I\'m concerned about what others think of me.','Socially, I am really shy.','I don\'t have a ton of energy.','I believe that laws do not apply to me.','I\'m prone to mood swings.','I will have a grudge against a person.','I usually act on an impulse.','I\'ve sensed the presence of another individual who wasn\'t actually present.','Interacting with others appears to provide me less pleasure than it does others.','I enjoy being the focus of attention.','I don\'t allow anyone to cut ahead of me in line.','Others must follow my instructions.','I am a great believer in planning ahead of time.','Change is something I dislike.','I enjoy reading a wide range of literature.','I\'m a sucker for thrills.','I like to spend money rather than collect it.','I enjoy being careless','I\'ve never given a f**k what other people thought of me.','As soon as I think of something that has to be done, I generally get right to work on it.','I frequently have the impression that people are laughing or talking about me.','I make an effort to forgive and forget.','I am unconcerned about others.','Sometimes, my actions are a form of payback.','I\'ve had an encounter with a divine force.','I am a devout follower of religion.','When I was in school, I was a better-than-average student.','When I was a kid, I felt quite connected to my parents.','I get a sensation of insignificance or despondency.','Science intigues me.','Most questions, in my opinion, have just one correct solution.','I can be both joyful and annoyed at times.','It is always better to be safe than sorry, in my opinion.','I\'m not easily irritated.','When I was a kid, I longed to run away from home.','I adore cracking jokes and behaving in a lighthearted manner.','I am a person who makes enemies.','How machines function fascinates me.','In school, I despised mathematics.','My vocabulary is vast.','I enjoy reading.','I don\'t actually give a shit about how I look.','I\'m concerned about plenty of things.','I\'m easily frightened.','I adore huge parties.','I seldom daydream.','I crave the experience of great art.','I tend to vote for liberal candidates in elections.','I sympathise with individuals who are in a worse situation than I am.','To catch people\'s attention, I utilise my charm.','I stay away from physically high risk activities.','When I hear of a terrible occurrence, I immediately feel sorry.','Even when I don\'t feel like it, I can force myself to work on a challenging assignment.','I pay far too little attention to the finer details','I dislike going to museums.','I don\'t feel it necessary to innovate and create.','I have a hard time expressing affection.','It is simple for me to manipulate people.','I can\'t imagine deceiving or defrauding somebody.','At parties, I chat to a lot of different individuals.','I despise being in charge of people.','I\'m notorious for forgetting to put things back where they belong.','I make decisions without consulting anyone else.','I enjoy going to new places.','I have time to relax and have fun.','I am willing to try new things.','I don\'t give a damn what other people think.','I\'m not sure where I\'m headed with my life.','I\'d like to be in a position of more authority than others.','I am a firm believer in world peace.','I am adept at dealing with social settings.','I try to stay away from persons who are very complicated.','I consider myself to be a capable leader.','I try to stay away from crowds.','I\'m not very good at telling jokes.','I do not use offensive words.','I am capable at fixing electrical-wiring issues.','I adore strategic games.','In school, I was a poor learner.','I frequently pause to consider how I\'m feeling.','I am completely absorbed in music.','I enjoy solving tough problems.','I\'m worried about other people.','I like to be organized.','I don\'t feel inclined to be in close to others.','I love my rivals.','My imagination is far more expansive than that of my peers.','Organizing tasks and activities is challenging for me.','I believe that life is meaningless.','I enjoy being the one in charge and commanding everyone\'s attention.','I have physically assaulted someone.','In a crowd, I prefer to stand out.','When people modify the way I\'ve organised things, I feel irritated.','I\'d like everything to go as planned.','I\'m always in a nasty mood.','I aspire to be the best.','I feel exploited by others.','My urges are within my control.','I know how to make others feel good by saying the right things.','I get so caught up in things that I lose track of time.','I\'m easily bored.','I insist that you pay attention to me.','Everything has to be \'exactly right\' for me.','Strange places fascinate me, and I\'d like to visit them.','My pals find me amusing.','I\'m afraid of being humiliated.','I\'d like to be alone.','I\'m not sure why I do things the way I do.','I am exacting in my work.','I have trouble visualising things.','Theoretical debates do not intrigue my interest.','I detest being the target of jokes.','I make rational plans for my life.','I indulge in my fantasies.','I rarely cry when I see a sad movie.','I start working right away.','I\'m waiting for someone else to take the lead.','I\'ve never had a hatred for anyone.','I\'m in need of reassurance.','I have a high level of emotional intensity.','I devote a significant amount of time to reading.','I don\'t attempt to figure out who I am.','I don\'t keep my promises.','I need motivation to get started.','I have a vivid and dramatic manner of expressing things.','I\'m always thinking of new ways to accomplish things.','I dislike spending money.','I believe in a higher force, which I refer to as God.','I\'m the life and soul of the party.','I don\'t try to fit in with society\'s standards.','I wonder how I came to be the way I am.','In life, I feel like I\'ve been mistreated.','I won\'t delve too deeply into a topic.','I\'m prone to panic.','I am a person with a strong personality.','I\'d rather be completely engaged in life than sit on the sidelines.','I go overboard with my spending.','I am able to put them at ease.','I\'m always ready.','Regardless matter how miserable I am, I keep my sentiments to myself.','I blow through more money than I have.','I enjoy chatting.','It\'s difficult to get to know me.','I retaliate against those who disrespect me.','Most of the time, I am relaxed.','I keep an eye on things more frequently than is required.','I\'m too exhausted to accomplish anything.','I\'m not one to draw attention to myself.','I am an excellent listener.','When I\'m furious, I yell or scream.','I open out about my intimate feelings.','I\'m constantly under duress.','Most individuals, I suppose, would lie to get an advantage.',NULL),(2,'Know Your Personality','2',142,'In most cases, you are:','You would lead with tremendous delight if you were a teacher of:','You\'re more likely to allow:','For a 1-day travel, you:','When in a group of people, you normally:','Communication is typically easy for you:','Of the following, what you will take as a complement:','You\'d rather:','In gatherings, usually:','You\'re most likely to be referred to as:','Normally, you:','You have a habit of living and working:','You\'re more likely to:','You like individuals who:','What do you believe is a the more severe flaw?:','When you keep to a timetable, it:','Among your friends, you:','Would you rather have someone among your buddies who:','You are prone to do so while making a major decision:','Compiling a weekend to-do list:','Usually, you:','When you read for pleasure, you like:','You\'re more worried about:','Your productivity is enhanced:','People can figure out what you\'re interested in:','When you do the same thing as a lot of other people, you:','Which of the two words \'attachment - rationality\' do you prefer in terms of meaning?:','When you have a specific task to do, you like:','Normally, you:','Which of the two words in the \'facts - ideas\' pair do you prefer in terms of meaning?:','Which of the two words \'thoughts - feelings\' do you prefer in terms of meaning?:','When you know that you will do something at a specific moment:','Which of the two words \'cheerful - calm\' do you prefer in terms of meaning?:','In terms of meaning, which word \'theory - practise\' do you prefer?:','Which of the two words \'convincing - touching\' do you prefer in terms of meaning?:','Which of the two words \'prescribed - unplanned\' do you prefer in terms of meaning?:','Which of the two words \'restrained - talkative\' do you prefer in terms of meaning?:','Which of the two words in the \'theory - fact\' pair do you prefer in terms of meaning?:','Which of the two words \'analyse - sympathise\' do you prefer in terms of meaning?:','Which of the two words \'systematic - spontaneous\' do you prefer in terms of meaning?:','Which of the two words \'calm - lively\' do you prefer in terms of meaning?:','Which of the two words \'literal - figurative\' meaning do you prefer?:','Which of the two words \'justice - mercy\' do you prefer in terms of meaning?:','Which of the two words in the \'regular - random\' pair do you prefer in terms of meaning?:','Which of the two words \'say - write\' do you prefer in terms of meaning?:','In terms of meaning, which word from the \'dreamy - practical\' pair do you prefer?:','Which of the two words \'compassion - prudence\' do you prefer in terms of meaning?:','Which of the two words \'impulse - decision\' do you prefer in terms of meaning?:','Which of the two words \'sociable - closed\' do you prefer in terms of meaning?:','Which of the two words \'produce - create\' do you prefer in terms of meaning?:','Which of the words \'benefit - good\' do you prefer in terms of meaning?:','Which of the two words \'punctuality - improvisation\' do you prefer in terms of meaning?:','Which of the two words in the \'party - theatre\' pair do you prefer in terms of meaning?:','Which of the two words \'prudent - charming\' do you prefer in terms of meaning?:','Which of the two words \'decisive - faithful\' do you prefer in terms of meaning?:','Which of the two words in the pair \'changing - constant\' do you prefer in terms of meaning?:','You believe of yourself to be:','Which of the two words \'execution - creativity\' do you prefer in terms of meaning?:','Which of the two words \'principle - kind-hearted\' do you prefer in terms of meaning?:','Which of the two words \'disciplined - informal\' do you prefer in terms of meaning?:','In a party, you:','Which of the two words \'concrete - abstract\' do you prefer in terms of meaning?:','Which of the two words \'peacemaker - judge\' do you prefer in terms of meaning?:','Which of the two words \'swift - thorough\' do you prefer in terms of meaning?:','Usually, you:','Which of the two words in the \'build - invent\' pair do you prefer in terms of meaning?:','Which of the two words in the \'soft - hard\' pair do you prefer in terms of meaning?:','You:','You normally, when something new comes into fashion, are:','Which of the two words \'foundation - spire\' do you prefer in terms of meaning?:','Which of the two words \'forgive - endure\' do you prefer in terms of meaning?:','Do you believe that sticking to a daily schedule:','When you\'re in an embarrassing situation, you normally:','Which of the two words \'intuition - experience\' do you prefer in terms of meaning?:','Which of the two words in the \'who - what\' pair do you prefer in terms of meaning?:','When you think about a small task that has to be completed or a purchase:','Do you believe your loved ones are aware of your feelings and thoughts?:','Which of the two words \'sign - symbol\' do you prefer in terms of meaning?:','Which of the two words \'praise - criticism\' do you prefer in terms of meaning?:','It is more challenging for you to adapt:','You, at parties:','Which of the two thoughts \'accept as it is - alter\' do you prefer in terms of meaning?:','Which of the two words \'cautious - gullible\' do you prefer in terms of meaning?:','When you begin a large project that must be completed as quickly as feasible, you:','Do you prefer to collaborate with others in large groups?:','Which of the two words \'understandable - mysterious\' do you prefer in terms of meaning?:','Which of the two words in the \'agree - argue\' pair do you prefer in terms of meaning?:','When you start a project, you hope:','What do you feel like when you\'re in a strange place?:','You\'ll prefer:','In terms of meaning, which word \'meek - persistent\' do you prefer?:','You would,  if you were asked on Saturday morning what you planned to do during the weekend:','Can you claim you\'re curious about other people\'s lives?:','According to you, higher praise for some one indicates:','You believe that it\'s bad to be:','A day filled with tedious and repetitive activities:','For you, speaking up and advocating for the group\'s interests is:','Do you believe, it\'s important to be able to:','You\'d rather work with an manager that\'s:','It\'s much easier for your friend to become someone who:','You would prefer to be someone who:','If you had public influence, then you:','If someone said the following about you, would it be true?:','Which of the two words \'decisiveness - curiosity\' do you prefer in terms of meaning?:','When you\'re interrupted, you:','Which of the two words \'observe - imagine\' do you prefer in terms of meaning?:','At work, you\'re more accustomed to displaying:','You\'d be delighted to work for a boss who is:','Do you:','You don\'t always listen to what others have to say because you\'re expecting what they\'ll say?:','Cold attitude towards your coworkers:','Often you do:','Can you be described as someone who is continually trying to learn and grasp new things?:','In a dispute, you:','What is of more importance to you, to:','In personal and professional life,  you:','You take pleasure in:','Which of the two words \'whole - details\' do you prefer in terms of meaning?:','Which of the two words \'honesty - tact\' do you prefer in terms of meaning?:','Anticipating the outcome you will rather say:','If you were asked an unexpected question, you:','You\'re used to caring more of events:','Do you have a tendency for predicting other people\'s emotions?:','Which of the two words \'understand - manage\' do you prefer in terms of meaning?:','You can say that about yourself:','You can be referred to as a person who:','Do you:','At the end of the day, you have a higher probability to:','At work you:','Do you work:','When working in a group you:','Is it true that you occasionally take in more information than you can process or use?:','You are more happy to report on the result of a work:','When doing a task, you:','You:','You\'re more likely to:','You:','Which of the two words \'work - inspire\' do you prefer in terms of meaning?:','You can describe yourself as a person who is:','Ideally, you:','When you discover new things, you:','You have a tendency to:',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessments_taken`
--

DROP TABLE IF EXISTS `assessments_taken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments_taken` (
  `idassessments_taken` int NOT NULL AUTO_INCREMENT,
  `idAssessments` int NOT NULL,
  `iduser_candidate` int NOT NULL,
  `Result` longtext NOT NULL,
  `Result_Detail` longtext,
  PRIMARY KEY (`idassessments_taken`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments_taken`
--

LOCK TABLES `assessments_taken` WRITE;
/*!40000 ALTER TABLE `assessments_taken` DISABLE KEYS */;
INSERT INTO `assessments_taken` VALUES (13,2,1,'ENTJ ENTJ personality type are great leaders and organisers. They can easily comprehend and hypothesise long-term goals. They have a great desire to fix inefficient procedures—to arrange people and situations so that they may go in the proper track. ENTJs are strategic visionaries who are skilled at anticipating the requirements of the people and organisations they manage.\nStimulating interactions with people excite and energise ENTJs. They frequently question people\"s claims and actions, expecting others to defend them and, as a consequence, mutual learning to occur. People who are informed and who stand up to them, speak what they think, and debate convincingly are admired and sought after by ENTJs. Although ENTJs want things to be fixed and straightforward, their enthusiasm for ideas can lead them to engage in wide-ranging Intuitive research and conversations. People might be overwhelmed by their linguistic fluency, decisiveness, self-confidence, and desire to organise others at times. Others often describe ENTJs as direct, decisive, and demanding, as well as objective, fair, and stimulating.',NULL),(14,1,1,'Openness: 38%\nCooperativeness: 59%\nAdjustment: 51%\nPersistence: 49%\nAgreeableness: 38%\nAmbition: 36%\nOpenness to Experience: 33%\nLearning Approach: 45%',NULL);
/*!40000 ALTER TABLE `assessments_taken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `ideducation` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Degree` varchar(255) DEFAULT NULL,
  `Institute` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Starting_Year` varchar(255) DEFAULT NULL,
  `Ending_Year` varchar(255) DEFAULT NULL,
  `About` varchar(10000) DEFAULT NULL,
  `user_candidate_fk` int NOT NULL,
  PRIMARY KEY (`ideducation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,'Undergraduate','Bachelors in Computer Science','Habib University','Karachi','2010','2015','good uni',1);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer` (
  `idemployer` int NOT NULL AUTO_INCREMENT,
  `Organization_Name` varchar(1024) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Contact_Number` varchar(255) NOT NULL,
  `About` mediumtext,
  `Vision` mediumtext,
  `Location` varchar(1024) DEFAULT '',
  `Website_Link` varchar(255) DEFAULT '',
  `Team_Size` varchar(255) DEFAULT '',
  `Industry` varchar(255) DEFAULT '',
  `Year_Established` varchar(45) DEFAULT '',
  PRIMARY KEY (`idemployer`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
INSERT INTO `employer` VALUES (1,'Grim Reaper Inc','salman.younus512@gmail.com','1','123456','we big company rich','We hire intelligent and brilliant candidates.','Karachi, Pakistan','www.grimreaper.com','25','Finance','2005');
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `idjob_applications` int NOT NULL AUTO_INCREMENT,
  `iduser_candidate` varchar(45) NOT NULL,
  `idjob_postings` varchar(45) NOT NULL,
  PRIMARY KEY (`idjob_applications`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
INSERT INTO `job_applications` VALUES (4,'1','4'),(22,'1','2');
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_postings`
--

DROP TABLE IF EXISTS `job_postings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_postings` (
  `idjob_postings` int NOT NULL AUTO_INCREMENT,
  `idemployer` int NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Job_Title` varchar(255) NOT NULL,
  `Job_Type` varchar(255) DEFAULT NULL,
  `Job_Category` varchar(255) DEFAULT NULL,
  `Industry` varchar(255) DEFAULT NULL,
  `Job_Experience` varchar(255) DEFAULT NULL,
  `Job_Qualification` varchar(255) DEFAULT NULL,
  `Job_Level` varchar(255) DEFAULT NULL,
  `Job_Description` mediumtext,
  `Job_Responsibilities` mediumtext,
  `Job_Requirements` mediumtext,
  `Date_Posted` varchar(255) NOT NULL,
  `Assessments_Required` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idjob_postings`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_postings`
--

LOCK TABLES `job_postings` WRITE;
/*!40000 ALTER TABLE `job_postings` DISABLE KEYS */;
INSERT INTO `job_postings` VALUES (2,1,'salman@gmail.com','123-456-789','Karachi, Pakistan','Web Developer','Full Time','Web Development','Software Development','1 - 2','Bachelor Degree','Employee','Looking for experienced web developer.','Developing new user-facing features using React.js\nBuilding reusable components and front-end libraries for future use\nLeverage native APIs for deep integrations with both platforms.','Must know PHP, Nodejs, python.\nKnowledge of other languages is a bonus.\nGood communication and verbal skills','04 Mar 2022','1'),(4,1,'hammad@gmail.com','123-678-123','Lahore, Pakistan','UI/UX Designer','Internship','Front-end Development','Software Development','0','None','Intern','Softech Worldwide is looking to hire \"UI/UX Designer\"','Develop new user-facing features\nBuild reusable code and libraries for future use\nEnsure the technical feasibility of UI/UX designs\nOptimize application for maximum speed and scalability','Strong experience of web front-end development\nCreative and passionate for user experience to be exceptional.\nMust have worked on WordPress.\nStrong experience with JavaScript & JavaScript-based libraries and frameworks including React JS would be a plus.','25 Feb 2022','2');
/*!40000 ALTER TABLE `job_postings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personality_info`
--

DROP TABLE IF EXISTS `personality_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personality_info` (
  `idpersonality_info` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(255) DEFAULT NULL,
  `Info` longtext,
  PRIMARY KEY (`idpersonality_info`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personality_info`
--

LOCK TABLES `personality_info` WRITE;
/*!40000 ALTER TABLE `personality_info` DISABLE KEYS */;
INSERT INTO `personality_info` VALUES (1,'ENFJ','ENFJ personality types are extremely sensitive to others, and they use empathy to rapidly grasp others\" emotional needs, motives, and problems. Their main goal is to help people and encourage their development. ENFJs are amiable persuaders who can often find common ground among people with a wide range of interests and motivations. They frequently serve as catalysts, bringing everyone together and bringing out the best in others. They may be both inspirational leaders and loyal followers.\nENFJs are vivacious, passionate, and socially conscious. Even the most reticent individual may be drawn out and involved by their genuine curiosity. They listen to and support others, but they also have strong ideals and ideas of their own, which they will plainly communicate. People excite ENFJs, and they are socially skilled; nonetheless, they have a tremendous need for genuine, deep connections. They work with tremendous zeal and dedication to create and maintain these. ENFJs value order in their life and will seek to resolve unclear relationships or circumstances. When people\"s needs collide with schedules and rules, however, they will prioritise individuals. Others describe ENFJs as sociable, likeable, courteous, and friendly. Persuasive, expressive, and responsive.'),(2,'ESFJ','ESFJ personality type like organising people and settings before collaborating with others to finish projects effectively and on schedule. They are devoted and diligent, even in minor situations, and they want others to do the same. They focus heavily on stability and security. ESFJs are sociable and outgoing people who like traditions and festivities, and they add a level of personal care to the workplace and home. They want to be recognised for who they are and what they do for others.\nInteraction with others energises ESFJs, and they are genuinely interested in the lives and concerns of others. They thrive in organised environments and love establishing order, structure, and timetables. They like to do things the way they\"ve always done them. When possible, ESFJs will agree with others for the sake of harmony. They do, however, have strong values that they convey clearly and boldly when the situation calls for it. Family and social relationships are important to ESFJs. They appreciate being a part of a group and excel at customs and festivities. Others describe them as gregarious, outgoing, enthusiastic, and active. Well-organized and well-ordered. Traditions are important to them.'),(3,'INFP','INFPs have an inner core of values that they use to drive their relationships and judgments. They want to be involved in work that benefits both their own and others\" growth and development, and they want to have a purpose that goes beyond their wage. They make it a point to define their ideals and live in accordance with them. INFPs understand and respect the emotional and psychological needs of others, even when such needs aren\"t acknowledged or stated by others.\nRules and regulations are disliked by INFPs, who like to operate independently. They are malleable and flexible unless their underlying beliefs are violated. They cease adapting after that. Others may be surprised by the intensity with which value judgements are expressed as a result. INFPs are cautious and choosy when it comes to communicating their deepest beliefs and sentiments. Relationships with depth, sincerity, real connection, and mutual progress are valued by them. INFPs admire individuals who take the effort to learn about their beliefs and ambitions. Others often describe INFPs as sensitive, contemplative, and complicated, as well as unique and original. It might be tough to comprehend at times.'),(4,'ISFP','ISFPs live in the present and have a peaceful feeling of delight, and they long for more time to savour each moment. They value the ability to choose their own path, have their own space, and make their own schedule, and they provide others the same freedom and tolerance. They are dependable when it comes to fulfilling responsibilities to people and things that matter to them. ISFPs take a long time to create intimacy with people, but once they do, those connections are vital. They demonstrate their love for others in a variety of gentle ways.\nISFPs are adaptive and flexible until something important to them is threatened, at which point they cease adjusting. They care a lot about people, but they prefer to demonstrate it by doing things for others rather than saying it.\nISFPs are modest and unassuming, and their warmth, enthusiasm, and fun humour may go unnoticed by others who are unfamiliar with them. They would rather watch and encourage than arrange circumstances; they have no desire to be in charge. Others may underestimate ISFPs, and they may underestimate themselves. They frequently take what they do well for granted and exaggerate the disparity between their internal standards and their real conduct and results. ISFPs are typically perceived as quiet, restrained, and private by others. Tolerance and spontaneity are two words that come to mind when describing ISFPs'),(5,'ENTJ','ENTJ personality type are great leaders and organisers. They can easily comprehend and hypothesise long-term goals. They have a great desire to fix inefficient procedures—to arrange people and situations so that they may go in the proper track. ENTJs are strategic visionaries who are skilled at anticipating the requirements of the people and organisations they manage.\nStimulating interactions with people excite and energise ENTJs. They frequently question people\"s claims and actions, expecting others to defend them and, as a consequence, mutual learning to occur. People who are informed and who stand up to them, speak what they think, and debate convincingly are admired and sought after by ENTJs. Although ENTJs want things to be fixed and straightforward, their enthusiasm for ideas can lead them to engage in wide-ranging Intuitive research and conversations. People might be overwhelmed by their linguistic fluency, decisiveness, self-confidence, and desire to organise others at times. Others often describe ENTJs as direct, decisive, and demanding, as well as objective, fair, and stimulating.'),(6,'ESTJ','ESTJs tend to arrange projects, operations, processes, and people to get things done. They live by a set of distinct values and beliefs, make a concerted effort to adhere to them, and expect others to do the same. Competence, efficiency, and results are important to them, and they show it in their work.\nESTJs love communicating with others and working with them as long as they are held accountable for meeting deadlines and finishing tasks. They operate best when there are clear, well-defined issues that can be tackled using tried-and-true methods.\nOthers look on ESTJs to take leadership and get things done because they naturally design systems, processes, and plans. Because ESTJs are so adamant about how things should be, others may find them overbearing at times. People rarely have to question where they stand since they communicate in a simple and honest manner. ESTJs are social and love connecting with others, particularly when it comes to duties, games, customs, and family activities. They take their duties in relationships seriously and carry them out responsibly: Others often describe ESTJs as trustworthy and conscientious, as well as decisive, vocal, and self-assured.'),(7,'INTP','INTPs are self-sufficient problem solvers who thrive at offering a detached, brief examination of a situation or concept.\nThey are the ones who ask the tough questions. putting others and oneself under pressure to come up with fresh logical methods. When INTPs are given the freedom to work independently on a subject whose solution necessitates a departure from conventional thinking or expertise, their finest work may emerge. Their insightful critiques and summaries may help a group reach to the heart of difficult situations, even if they function best alone.\nINTPs are typically calm and reserved, yet they can become passionate when discussing topics about which they are particularly informed. They are more interested in the challenge of discovering answers than in putting solutions into practise until their work needs it. They dislike organising people or circumstances. INTPs are tolerant of a wide spectrum of conduct, only disputing and voicing problems when they think it is appropriate. When their underlying beliefs are questioned, however, their flexibility vanishes, and they cease to adapt.\nINTPs value clarity in communication over duplication and expressing the obvious. They want to say exactly what they mean, yet they could make it so complicated that others don\"t comprehend it. INTPs are typically perceived by others as quiet, contained, calm, and distant observers who value autonomy.'),(8,'ENFP','For ENFPs, Life is a creative experience full of fascinating possibilities. ENFPs have a good sense of people and a keen understanding of the present and future. They are subjected to a wide spectrum of emotions and moods. They crave encouragement from others and are quick to express gratitude and support. ENFPs are strong at figuring out how individuals and groups operate, and they are persuasive and captivating when it comes to pursuing their goals. They are versatile, blossoming in any location. Their excitement and drive inspire others to grow as well.\nENFPs are often extroverted, friendly, and have a big network of friends. They are curious about practically everything and have a zeal for life that attracts others. At the same time, they place a high importance on depth and authenticity in their intimate relationships, and they devote a lot of time and effort to establishing and maintaining open and honest communication.\nRoutine, timetables, and structure irritate ENFPs, and they typically manage to escape them. Even in extemporaneous settings, they are typically linguistically proficient; but, when their deepest values need to be spoken, they may become uneasy and voice their judgements with atypical passion. ENFPs are often described as personable, observant, and persuasive by others.\n'),(9,'ENTP','ENTPs are always looking for chances and possibilities in their surroundings. They notice patterns and connections that others miss, and they have the ability to glimpse into the future at times. They are skilled at developing conceptual alternatives and then strategically examining them. ENTs have an excellent awareness of how systems function and are inventive and entrepreneurial when it comes to moving inside them to attain their goals.\nENTs are adaptive and spontaneous. Schedules and standard operating procedures are restrictive to them, thus they try to avoid them whenever feasible. They have a remarkable ability to read people\"s minds, and their zeal and energy may inspire others to join their cause. Because they like debating concepts, their conversational approach is usually difficult and engaging. They\"re good at conversing, fast on their feet, and like verbal sparring. They may, however, communicate with an intensity and abruptness that appears to confront others while expressing their fundamental Thinking ideas. Others think of ENTPs as self-sufficient, creative, and independent. vivacious, enthused, and energised.'),(10,'INFJ','INFJs have an innate ability to instinctively perceive complex meanings and interpersonal interactions. They trust their intuition and discover that they often empathically comprehend people\"s sentiments and intentions before they are even aware of them. They mix empathy with the energy and organisation needed to put global plans in place to improve people\"s lives. INFJs have a visionary understanding of human interactions and potential, which may uplift and inspire others when communicated.\nINFjs are quick to exhibit sympathy and care for others, but they only tell people they trust about their inner feelings. Others may find them difficult to understand because they keep this most valuable and vital part of themselves hidden. They frequently convey their internal feeling of \"knowing\" symbolically and with intricacy while attempting to articulate it. In relationships, they place a premium on sincerity and devotion. INFJs are reticent by nature, but they don\"t hesitate to speak out when their ideals are disrespected. They can therefore be tenacious and pushy. Others see INFJs as secretive, even mysterious, intense, and self-centered.'),(11,'INTJ','INTJs have a clear vision of the future, as well as the desire and organisation to put their ideas into action. They enjoy challenging problems and can quickly synthesise complex theoretical and abstract concepts. They design tactics to attain their objectives once they have established their overall structure. They generate visionary objectives and a broad brush strategy for accomplishing them inside vast organisational structures as a result of their global thinking. Knowledge is important to INTJs, and they expect competence from themselves and others. They despise disorganisation, chaos, and inefficiency in particular.\nThough they may find it difficult to participate in social discourse, INTJs portray a calm, confident, and secure face to the world. They seldom convey their most important and significant aspect: their creative thoughts. Rather, they convert them into rational conclusions, ideas, and goals, which they frequently convey. Others may see INTJs as stubborn as a result of this, much to the INTJ\"s surprise, since the INTJ is highly willing to adjust his or her mind when new information comes. Others typically see INTJs as private, quiet, difficult to get to know, and even distant, as well as conceptual, original, and self-sufficient.'),(12,'ESFP','ESFPs are life enthusiasts. They appreciate people, food, clothing, animals, the natural environment, and activities because they live in the now. They seldom let restrictions interfere with their life, instead focused on finding innovative solutions to address human needs. ESFPs are superb team players, focused on completing tasks with as much enjoyment as possible and as little hassle as possible.\nESFPs enjoy life and are enjoyable to be around; their excitement and zeal attract others. They are adaptive, flexible, kind, and easygoing. They rarely plan ahead, instead relying on their ability to react quickly and effectively to whatever situation arises. They despise discipline and regularity and will go out of their way to avoid them. ESFPs learn best by doing and connecting with their surroundings. Theory and textual explanations are frequently disliked by them. Traditional schooling can be challenging for ESFPs, but when they recognise the relevance and are able to connect with people or the things being studied, they perform well. Others often describe ESFPs as resourceful and supportive, as well as Gregarious, fun-loving, lively, and spontaneous.'),(13,'ESTP','ESTPs are active problem solvers who respond creatively to difficult challenges in their surroundings. They seldom let regulations or regular processes to get in the way of novel methods of using current systems. They devise simple strategies for doing challenging tasks and make their work enjoyable. They are adaptive, imaginative, and resourceful, and they can bring disparate factions together. They also work well in groups. Because of their zeal for life and love of the present, they are popular partners for activities (parties, sports, or work).\nThe art of living is a strong suit for ESTPs. Others respond to their excitement and good humour because they enjoy life and immerse themselves in it. ESTPs are action-oriented persons. Theory and written directives are frequently disliked and avoided by them. Traditional schools can be challenging for those with these preferences, but ESTPs do well when given the opportunity to experiment and understand the relevance. Others view ESTPs as Gregarious, fun-loving, and spontaneous people, as well as Adventurous risk-takers and Pragmatic problem-solvers.'),(14,'ISFJ','ISFJs are dependable and courteous, devoted to the people and groups with which they interact, and dependable in carrying out tasks. They work tirelessly to accomplish things completely and on schedule. They will go to considerable lengths to perform what they believe is vital, but they despise being forced to do something they don\"t understand. ISFJs pay attention to what others need and desire, and they set up systems to ensure that their needs and wants are met. They take their obligations and tasks seriously, and they expect others to do the same. Family relationships and obligations are particularly important to ISFJs, who take pride in their work and expect others in their family to do the same.\nIn their interactions, ISFJs are unassuming and quiet, frequently prioritising the needs of others, particularly family members. They dislike conflict and will go to great lengths to accommodate others, however their respect for traditions and other people\"s feelings may lead them to oppose behaviours that they believe to be harmful or inappropriate. Their ideals, yearning for structure and closure, and kindness are all visible. Others may not notice the abundance of rich, precise internal Sensing sensations and recollections. ISFJs are typically thought as as quiet, serious, and diligent by others. They are Considerate, responsible, who keep promises and uphold traditions'),(15,'ISTJ','ISTJs have a high feeling of responsibility for the organisations, families, and connections in their lives, and they are extremely devoted to them. They strive tirelessly to meet commitments on schedule and as indicated. They will go to great lengths to accomplish anything they believe is vital, but they will refuse to perform anything that does not make sense to them.\nISIs like to work alone and be accountable for their outcomes; yet, they are comfortable working in teams when it is required to complete the task, when duties are clearly defined, and when everyone does their given tasks. ISTJs value competence and responsibility above all else, and they want others to be as diligent and trustworthy as they are.\nWhen they are comfortable in their roles, ISTJs are gregarious; nonetheless, they rarely communicate their wealth of rich Sensing insights and memories with anybody other than close friends. Others may see their standards and judgements, as well as their craving for discipline and timetables, but they may miss their personal, sometimes amusing, reactions. It might be difficult for ISTJs to understand the logic of requirements that are quite different from their own, but if they are convinced that something important to someone they care about, that need becomes a reality. They then go to tremendous efforts to fulfil the demand, despite the fact that they continue to believe it is absurd. Others perceive ISTJs as calm, reserved, and serious, as well as consistent and orderly people who value traditions.'),(16,'ISTP','ISTPs pay close attention to what is going on in their environment. When the need arises, they move rapidly to get to the root of a problem and fix it as efficiently as possible with the least amount of work. They are fascinated by how and why things operate, but they are uninterested in abstract theories unless they can rapidly apply them. They frequently serve as troubleshooters. ISTPs despise rules and regimentation, preferring diversity and novelty, and like the challenge of tackling a fresh, tangible, and complex problem.\nISTPs are egalitarian and tolerant of a wide spectrum of behavior—until their guiding logical principles are challenged. They might then surprise people by voicing their forceful and unequivocal opinions. Because they are not disputing, ISTPs listen and appear to agree; subsequently, others may discover the ISTP was evaluating and forming internal judgements. With their continual scanning for information and results-oriented concentration, ISTPs are quick to shift course if they discover a better, more efficient approach. Others have difficulty \"reading\" them as a result of this. They are usually quiet and reserved, but in areas where they have a lot of expertise, they may be rather outspoken. Others often describe ISTPs as adaptable, action-oriented risk takers who are confident, autonomous, and self-determinated.');
/*!40000 ALTER TABLE `personality_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_candidate`
--

DROP TABLE IF EXISTS `user_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_candidate` (
  `iduser_candidate` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Contact_Number` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Job_Title` varchar(255) DEFAULT NULL,
  `Position` varchar(255) DEFAULT NULL,
  `About_Me` varchar(10000) DEFAULT NULL,
  `Facebook_Link` varchar(255) DEFAULT NULL,
  `Twitter_Link` varchar(255) DEFAULT NULL,
  `Instagram_Link` varchar(255) DEFAULT NULL,
  `Linkedin_Link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser_candidate`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_candidate`
--

LOCK TABLES `user_candidate` WRITE;
/*!40000 ALTER TABLE `user_candidate` DISABLE KEYS */;
INSERT INTO `user_candidate` VALUES (1,'salman','salman.younus512@gmail.com','1','03353394033','Male','Web Developer','Junior Developer','computer science major','123','','','');
/*!40000 ALTER TABLE `user_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `idwork_experience` int NOT NULL AUTO_INCREMENT,
  `Designation` varchar(255) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL,
  `Starting_Year` varchar(255) DEFAULT NULL,
  `Ending_Year` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Job_Responsibilities` varchar(10000) DEFAULT NULL,
  `user_candidate_fk` int NOT NULL,
  PRIMARY KEY (`idwork_experience`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (1,'Web Dev','ABC Company','2018','2021','Los Angeles','to make backend',1),(2,'Wordpress Dev','DEF Company','2015','2018','Karachi','to make frontend',1);
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-04  1:49:16
