# Game Design Document

> [Origin of this template](https://drive.google.com/file/d/1-yiF2Pq-OgJaTXsMAQbIckoDzGINz26O/view) [Related reddit discussion](https://www.reddit.com/r/gamedesign/comments/7ze7xq/finished_game_design_document_examples/)
>
> ***This is a skeleton/reference for a game design concept. Your full design documents will be much longer!***

## 概述 (High Level Concept/Design)

### Game Title

> *Your game’s title should communicate the gameplay and the style of the game*

《建设世界一流大学》（暂定）（代号：UniversitySim）

### Concept Statement

> *The game in a tweet: one or two sentences at most that say what the game is and why it’s fun.*

这是一个让玩家利用手里的资源规划建设一所大学的回合制策略游戏。

### Game Genre

> *Single genre is clearer but often less interesting. Genre combinations can be risky. Beware of ‘tired’ genres.*

策略、模拟、文字、荒诞、黑色幽默

### Target Audience

> *Motivations and relevant interests; potentially age, gender, etc.; and the desired ESRB rating for the game.*

当然是任何一个有过大学生活经历的人，尤其是在北京某全是建筑工地的大学里经历过中国特色大学教育的人，会在这个游戏中得到更加深刻的感触~

### Unique Selling Points

> ***Critically important.*** *What makes your game stand out? How is it different from all other games?*

1. **独特的游戏背景**。据我们所知，没有策略/模拟经营类游戏曾经尝试模拟建设和发展一所中国大学的全过程，以中国大学为背景的游戏基本都是AVG/Galgame。因此，这个游戏能提供全新的独特体验。
2. **“想着再来一回合，不知不觉就天亮了”**。正和诸如《文明》、《群星》这类策略游戏代表作一样，我们希望这个游戏能够通过设计大量相互重叠的短期目标和即时反馈，给玩家欲罢不能的游戏体验。
3. **幽默的游戏叙事**。我们计划在游戏中添加大量的随机事件和“梗”，使人眼前一亮，捧腹大笑。
4. **深刻的启发意义**。虽然做到这个也许有点难，但是我们希望玩家能够从中得到一些对于中国大学现实的启发，能让这个世界变好一点点（划掉）。

## 产品设计 (Product Design)

### Player Experience and Game POV

> *Who is the player? What is the setting? What is the fantasy the game grants the player? What emotions do you want the player to feel? What keeps the player engaged for the duration of their play?*

玩家是一所大学的“虚拟的最高控制者”，正如在P社游戏里玩家是一个国家的“虚拟的最高统治者“。游戏的背景就是2019年的中国。游戏能让玩家体验到建设一所大学过程中的爽快（与混乱和邪恶）。我们希望玩家体会到一种不得不这么做的感觉

### Visual and Audio Style

> *What is the “look and feel” of the game? How does this support the desired player’s experience? What concept art or reference art can you show to give the feel of the game?*

由于我们既没时间，画画也手残，因此我们决定这个游戏应该是纯文字游戏，并且当前不计划添加任何音乐。游戏的界面风格会类似于网页的界面风格，设计原则与网页UI设计原则相同。不过因为是游戏，我们也许会添加更多的UI动画和特效，让UI更加精美。

### Game World Fiction

> *Briefly describe the game world and any narrative in player-relevant terms (as presented to the player).*

《建设世界一流大学》是一个极简的策略类模拟游戏，你的任务是规划一所中国大学的建设与发展，规划学校政策，建设品质校园，力争为师生打造能够高效学习与科研的环境，为世界一流大学的建设添砖加瓦！你的合理建设能使得师生全身心投入学习与科研，国际排名不断上升，最终成为世界一流大学！不过，如果你的建设有问题的话，会发生什么就不得而知了...

### Monetization

> *How will the game make money? Premium purchase? F2P? How do you justify this within the design?*

这个游戏怎么可能赚钱呀←_←

### Platform(s), Technology, and Scope (brief)

> *PC or mobile? Table or phone? 2D or 3D? Unity or Javascript? How long to make, and how big a team? How long to first-playable? How long to complete the game? Major risks?*

目标平台与技术：电脑网页端，2D，JavaScript实现，使用Cocos2d引擎。

为什么选择电脑网页端：UI可以承载更多信息，我们希望做一个更加精美更加精细的策略游戏。在手机平台上成功的复杂策略游戏很少。

制作时间与人员：总共11周时间，开发人员3人。

预计进度：共三到四次迭代开发。在三周后应该变得第一次可玩，十一周后达到完成度较高的水准。

主要风险：游戏引擎的学习成本，小组成员可否进行持续和有效的时间投入。游戏能否在有限地迭代内达到一个较高的可玩水准。

## 游戏系统设计 (Game System Design)

### Core Loops

> *How do game objects and the player’s actions form loops? Why is this engaging? How does this support player goals? What emergent results do you expect/hope to see? If F2P, where are the monetization points?*

核心循环是与任何一款策略游戏是一样的：玩家投入资源进行某项决策->某项决策产生正面/负面的结果->产生各种难以预料的事件->与玩家的目标又更进了一步。



### Objectives and Progression

> *How does the player move through the game, literally and figuratively, from tutorial to end? What are their short-term and long-term goals (explicit or implicit)? How do these support the game concept, style, and player-fantasy?*

资源：经费、名声

短期目标：获得经费、搞基础建设、提升教学与科研水平等

长期目标：提升国际排名。国际排名通过一系列复杂的指标算出

### Game Systems

> *What systems are needed to make this game? Which ones are internal (simulation, etc.) and which does the player interact with?*

#### 时间系统

我们选择基于Tick的时间系统（类似P社四萌），一个tick是一秒钟，一天5个tick，分别对应上午、中午、下午
晚上、凌晨。一学期共20周，一年两个学期，这样一年的游戏时长就是大约20分钟，一局需要10-50年完成。此外，我们希望玩家可以自行调整游戏的速度。

### Interactivity

> *How are different kinds of interactivity used? (Action/Feedback, ST Cog, LT Cog, Emotional, Social, Cultural) What is the player doing moment-by-moment? How does the player move through the world? How does physics/combat/etc. work? A clear, professional-looking sketch of the primary game UX is helpful.*

