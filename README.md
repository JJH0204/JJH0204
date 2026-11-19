# Jung Jaeho (정재호)

Game producer and developer. I design the game, write code for it, and run the servers my team builds on.

<p>
  <a href="https://jjh0204.github.io/JJH0204/"><img src="https://img.shields.io/badge/Portfolio-Korean-0C7A85?style=for-the-badge&logo=githubpages&logoColor=white" alt="Portfolio (Korean)"/></a>
  <a href="mailto:snowduck0204@gmail.com"><img src="https://img.shields.io/badge/Email-snowduck0204-12A3AE?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>
</p>

I spent two years and eight months designing live-service content for TalesRunner at Raon Entertainment. Since January 2026 I have been the PD of Maiden Dormireve, a PC game made by a team of 10 to 12. On the same team I built the build and release pipeline, and I host the Git server, issue tracker and build runner we all use. On weekends I teach networking.

## Where I fit on a team

| To | I am | What shows it |
|---|---|---|
| Engineers | A developer who understands design and art, and talks with both | At TalesRunner the client team first said Lens Custom could not be built. I studied how the existing costume dye textures were set up, showed the same method would work, and it shipped in the February 2023 patch. On Maiden Dormireve I chose the toon shader's features together with our modelers. |
| Designers and directors | A hands-on director who writes code and runs servers | As PD I wrote 36 of the 88 pull requests in our dev repository (35 merged) and 169 of its 581 commits. Tagged builds go from Gitea Actions to the Steam private branch and the demo app through a pipeline I built. |
| Learners | An instructor who is still shipping a product | I teach Network 1 and 2 at Korea IT Academy while my team gets the Maiden Dormireve Steam demo ready for December 1, 2026. |

## Now

[Maiden Dormireve](https://store.steampowered.com/app/5468600/) is a quarter-view 3D action extraction game with hotel management and character affinity, made in Unity 6 URP for PC. The Steam demo opens on December 1, 2026, and the full release is planned for Q2 2027.

## Selected work

| Project | Role | What I did |
|---|---|---|
| **Maiden Dormireve**<br/>BlueIgloo, 2026.01 to now, 10 to 12 people | PD and design, build and release, team servers | I run the weekly loop: build on Tuesday, play it on Wednesday and Thursday, then meet. I set up Windows builds on Gitea Actions with an Inno Setup installer, Addressables content builds, Discord notices and SteamPipe upload, plus repository checks for missing `.meta` files, duplicate GUIDs and large non-LFS files. I self-host Gitea, Plane and the build runner on a desktop server reachable only through Tailscale. Meeting notes come from Zoom recordings transcribed with Whisper and drafted with Claude. I designed and verified the [procedural level editor](https://github.com/JJH0204/unity-procgen-leveleditor) and the [URP toon shader](https://github.com/JJH0204/unity-toonshader); the code was written with Claude Code. |
| **TalesRunner**<br/>Raon Entertainment, 2020.08 to 2023.04 | Content and system designer | Three seasonal event channels, Custom Card Pack (a gacha where players pick the items in their own deck), Lens Custom, a co-op raid map, probability disclosure, and a Python tool to check item probabilities. |
| **Phantom:Makina**<br/>Team project, 2025.06 to 2026.09 | Design and development | Dungeon and stage managers, gamepad and touch cameras, Android builds, a GitHub Actions build workflow and two boss skills. My share of commits: 62 of 252 in 25Machina, 56 of 281 in the team repository. On my own and without AI tools I built [MonsterAI](https://github.com/JJH0204/MonsterAI), a behavior tree editor, and [GOS](https://github.com/JJH0204/GOS), a visual scripting tool. |
| **Personal games**<br/>2026.09 to 2026.10 | Design, playtesting, directing AI coding agents | Eraser Bumper Cars: design document v1 to v4 with a log of every rule I changed after play, and why; Windows, Android and macOS builds. Bada: fishing rules settled in a web mockup, then moved into engine-independent C# code with 16 acceptance criteria and ported to Godot 4.7 .NET. |
| **[VN-Pipeline](https://github.com/JJH0204/VN-Pipeline)**<br/>2026.11 | Author | Local ComfyUI pipeline and web studio for visual novel and game assets (sprites, CGs, backgrounds, pixel art) that runs offline on a Mac. |
| **[Store order relay](https://github.com/JJH0204/AllbenKitchenManager)**<br/>2026.01 to 2026.06 | Network and app | A Python (Scapy) packet sniffer and a Dart (Shelf) local server pass orders to a Flutter app on Windows and Android, inside a Tailscale network. |

## How I work with AI coding agents

I decide what to build and how to check it, and agents write much of the code. Pull requests made with an agent carry a `Co-Authored-By` line, and nothing counts as done until I have run it myself.

## Teaching

- Korea IT Academy, Network 1 and 2 instructor, weekend class (2026.08 to now)
- KT Cloud cyber security course, teaching assistant (2026.09 to now)
- ESTsoft ESTCamp, 10th cohort, learning tutor for the IT infrastructure security course (2026.03 to 2026.08)
- Completed the DevSecOps cloud security course (872 hours); Industrial Engineer Information Processing certificate (2025)

## Tools

**Game development**
<p>
  <img src="https://img.shields.io/badge/Unity-000000?style=flat-square&logo=unity&logoColor=white"/>
  <img src="https://img.shields.io/badge/C%23-512BD4?style=flat-square&logo=csharp&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Godot-478CBF?style=flat-square&logo=godotengine&logoColor=white"/>
  <img src="https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white"/>
</p>

**Build and collaboration**
<p>
  <img src="https://img.shields.io/badge/Gitea-609926?style=flat-square&logo=gitea&logoColor=white"/>
  <img src="https://img.shields.io/badge/Gitea_Actions-609926?style=flat-square&logo=gitea&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/SVN-809CC9?style=flat-square&logo=subversion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Plane-000000?style=flat-square"/>
</p>

**Infrastructure and network**
<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailscale-242424?style=flat-square&logo=tailscale&logoColor=white"/>
  <img src="https://img.shields.io/badge/GCP-4285F4?style=flat-square&logo=googlecloud&logoColor=white"/>
  <img src="https://img.shields.io/badge/Wireshark-1679A7?style=flat-square&logo=wireshark&logoColor=white"/>
  <img src="https://img.shields.io/badge/Scapy-000000?style=flat-square&logo=python&logoColor=white"/>
</p>

**AI tools**
<p>
  <img src="https://img.shields.io/badge/Claude_Code-D97757?style=flat-square&logo=anthropic&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI_Whisper-412991?style=flat-square&logo=openai&logoColor=white"/>
  <img src="https://img.shields.io/badge/ComfyUI-333333?style=flat-square"/>
</p>

**From coursework** (DevSecOps course team project)
<p>
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white"/>
  <img src="https://img.shields.io/badge/SonarQube-4E9BCD?style=flat-square&logo=sonarqube&logoColor=white"/>
</p>

## Security projects and notes

- [DevSecOps](https://github.com/JJH0204/DevSecOps): notes from the cloud security course (system, network, database and cloud security, penetration testing, CTF)
- [24DevSecOpsProject](https://github.com/JJH0204/24DevSecOpsProject): CI/CD with Kubernetes, Jenkins and SonarQube (Nova), and a joint red team and blue team security project (SuperNova)
- [Aurora](https://github.com/JJH0204/Aurora) and [Flame](https://github.com/JJH0204/Flame): a deliberately vulnerable web app for security training, and a web hacking wargame platform
- [Ignite CTF](https://github.com/JJH0204/Ignite_CTF): the first CTF made by team Firewalls (two challenge VMs and a wargame guide site)
- [J:Log](https://github.com/JJH0204/GitBook): study notes

---

snowduck0204@gmail.com · [jjh0204.github.io/JJH0204](https://jjh0204.github.io/JJH0204/) (Korean)
