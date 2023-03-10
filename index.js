const LastFM = require('last-fm')
const lastfm = new LastFM('16183a20d8517f5f677c5f254bb57275', { userAgent: 'MyApp/1.0.0 (http://example.com)' })
var Spotify = require("spotify-finder")
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: new Discord.Intents(32767)
});
const fs = require('fs');
const fsp = require('fs').promises;
const token = "MzYzNjI1OTUzNzgxNjEyNTQ1.GWjhBJ.mS-srnIC9W0RwCmi5Km0VwRgcURyETF5qxC8RI"
var d = new Date();
var ora = d.getHours() + 3;
var minut = d.getMinutes();
var secunda = d.getSeconds();
var ok=0;
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

client.on('ready', () => {
  console.log("M-am pornit boss")
  //Genres();
});

async function Genres() {
  try 
  {
    const client = new Spotify({
      consumer: {
        key: '1cfdfd756a144ecf8f938351d2ed576d',
        secret: '6239416d18294a00a1ccfa40b0025167' 
      }
    })
    var i, j, k, l, ok, poz;
    let genres = JSON.parse(fs.readFileSync('genres.json'))
    let data = JSON.parse(fs.readFileSync('melodii.json'))
    for (i = 0; i < data.artisti.length; i++)
    {
      let genres = JSON.parse(fs.readFileSync('genres.json'))
      let nume = data.artisti[i].formatie.split(";")[0];
        const params = {
          q: nume,
          type: 'artist',
          limit: 5
        }
        client.search(params)
      .then(d => {
          if (d.artists.items[0].genres.length > 0)
          {
            for (k=0; k<d.artists.items[0].genres.length; k++)
            {
              ok=0;
              for (l=0; l<genres.genuri.length; l++)
              {
                if (genres.genuri[l].nume == d.artists.items[0].genres[k]) {ok=1; poz=l}
              }
              console.log(ok);
              if (ok==0)
              {
                  genres["genuri"].push({"nume": d.artists.items[0].genres[k], "ascultari": 1, "artist": [nume]});
                  fsp.writeFile("genres.json", JSON.stringify(genres));
              }
              else 
              {
                  genres.genuri[poz].artist.push(nume);
                  genres.genuri[poz].ascultari++;
                  fsp.writeFile("genres.json", JSON.stringify(genres));
              }
            }
          }
        })
        console.log(genres);
        await sleep(75);
    }
    
    //console.log(genres)
    //fsp.writeFile("genres.json", JSON.stringify(genres));
  console.log("succes!")
  } catch (err) { console.log(err) }
}

function OreFixe() {
  try
  {
  const guild = client.guilds.cache.get("595634507600756794");
  var d = new Date();
  var id_curent, user_curent;
  var ora = d.getHours() + 1, s_ora = ora;
  var minut = d.getMinutes(), s_minut = minut;
  if (ora == 24) ora = 0;
  if (ora < 10) s_ora = `0${ora}`;
  if (minut <10) s_minut = `0${minut}`;
  const contest_channel = '986734838809755688';
  if ((ora == minut || minut == 0 || (ora%10 == Math.floor(minut/10) && Math.floor(ora/10) == minut%10)) && ok==0 && (ora >= 10 && ora <= 22))
  {
    ok=1;  
    const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${s_ora}:${s_minut}`)

    guild.channels.cache.find(i => i.id === contest_channel).send({embeds: [embed]}).then(async (msg) => {
      msg.react('🥳');
      const filter = (reaction, user) => {
        id_curent=user.id;
        user_curent=user.username;
        console.log(user.username);
        return ['🥳'].includes(reaction.emoji.name) && user.id != msg.author.id;
      };
  
      msg.awaitReactions({ filter, max: 1, time: 59000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
  
          if (reaction.emoji.name === '🥳') {
            if (id_curent == '238718268049719296') msg.channel.send(`${user_curent} a luat aceasta runda! <@844090524066512897> e o fraiera`);
            else if (id_curent == '844090524066512897') msg.channel.send(`${user_curent} a luat aceasta runda! <@238718268049719296> e un fraier`);
          }
        })
        .catch(collected => {
          if (id_curent == '238718268049719296') msg.channel.send(`${user_curent} a luat aceasta runda! <@844090524066512897> e o fraiera`);
          else if (id_curent == '844090524066512897') msg.channel.send(`${user_curent} a luat aceasta runda! <@238718268049719296> e un fraier`);
          else msg.reply('Nimeni nu a prins aceasta ora fixa!');
        });
      })
  } else if (!(ora == minut || minut == 0 || (ora%10 == Math.floor(minut/10) && Math.floor(ora/10) == minut%10))) ok=0; 
  } catch (e) { fs.appendFile('logs.txt', e + '\n', plm => { if (plm) return }) }
}

async function Algoritm() {
  try {
    const guild = client.guilds.cache.get("595634507600756794");
    var d = new Date();
    var ora = d.getHours() + 1;
    var minut = d.getMinutes();
    guild.members.fetch().then(members => {
      members.forEach(member => {
        try {
          if (member.id == "844090524066512897" && member.presence.activities.length != 0) {
            var content;
            if (minut > 9)
              content = `${ora}:${minut} ${member.presence.activities[0].state} - ${member.presence.activities[0].details}`;
            else content = `${ora}:0${minut} ${member.presence.activities[0].state} - ${member.presence.activities[0].details}`;
            content = content + '\n';
            try {
              let data = JSON.parse(fs.readFileSync('melodii.json'));
              var i, j, ok1 = 0, ok2 = 0, p_formatie, p_piesa, n_formatie, n_piesa;
              n_formatie = member.presence.activities[0].state;
              n_piesa = member.presence.activities[0].details;

              if ((n_formatie != data.artist_anterior && n_piesa != data.melodie_anterioara) || (n_formatie != data.artist_anterior && n_piesa == data.melodie_anterioara) || (n_formatie == data.artist_anterior && n_piesa != data.melodie_anterioara)) {
                fs.appendFile('logs.txt', content, err => {
                  if (err) {
                    console.error(err)
                    return
                  }
                })
                for (i = 0; i < data.artisti.length; i++) {
                  if (data.artisti[i].formatie == member.presence.activities[0].state) { ok1 = 1; p_formatie = i; }
                  for (j = 0; j < data.artisti[i].piese.length; j++)
                    if (data.artisti[i].piese[j] == member.presence.activities[0].details) { ok2 = 1; p_piesa = j; }
                }

                if (ok1 == 0) { 
                  var k, l, ok, poz;
                  const clientt = new Spotify({
                    consumer: {
                      key: '1cfdfd756a144ecf8f938351d2ed576d',
                      secret: '6239416d18294a00a1ccfa40b0025167' 
                    }
                  })
                  data['artisti'].push({ "formatie": member.presence.activities[0].state, "piese": [member.presence.activities[0].details], "ascultari": [1] });
                  let genres = JSON.parse(fs.readFileSync('genres.json'))
                  let nume = member.presence.activities[0].state.split(";")[0];
                  const params = {
                    q: nume,
                    type: 'artist',
                    limit: 5
                  }
                  clientt.search(params)
                  .then(d => {
                      if (d.artists.items[0].genres.length > 0)
                      {
                        for (k=0; k<d.artists.items[0].genres.length; k++)
                        {
                          ok=0;
                          for (l=0; l<genres.genuri.length; l++)
                          {
                            if (genres.genuri[l].nume == d.artists.items[0].genres[k]) {ok=1; poz=l}
                          }
                          console.log(ok);
                          if (ok==0)
                          {
                              genres["genuri"].push({"nume": d.artists.items[0].genres[k], "ascultari": 1, "artist": [nume]});
                              fsp.writeFile("genres.json", JSON.stringify(genres));
                          }
                          else 
                          {
                              genres.genuri[poz].artist.push(nume);
                              genres.genuri[poz].ascultari++;
                              fsp.writeFile("genres.json", JSON.stringify(genres));
                          }
                        }
                      }
                    })

               }
                else if (ok2 == 0 && ok1 == 1) {
                  data.artisti[p_formatie].piese.push(member.presence.activities[0].details);
                  data.artisti[p_formatie].ascultari.push(1);
                }
                else if (ok2 == 1 && ok1 == 1) {
                  data.artisti[p_formatie].ascultari[p_piesa]++;
                }
                data.melodie_anterioara = n_piesa;
                data.artist_anterior = n_formatie;
                data.id_melodie_anterioara = member.presence.activities[0].createdTimestamp;
                fsp.writeFile("melodii.json", JSON.stringify(data));
              }
            } catch (err) { fs.appendFile('logs.txt', err + '\n', plm => { if (plm) return }) }
          }
        } catch (e) { fs.appendFile('logs.txt', e + '\n', plm => { if (plm) return }) }
      });
    })
  } catch (er) { fs.appendFile('logs.txt', er + '\n', plm => { if (plm) return }) }
}

setInterval(function() {
  //OreFixe();
}, 1000);

setInterval(function() {
  Algoritm();
}, 15000);

client.on('messageCreate', async message => {
  try {
  if ((message.author.id == "238718268049719296" || message.author.id == "844090524066512897") && message.content == "!stats") {
    let data = JSON.parse(fs.readFileSync('melodii.json'))
    var i, j, x1 = 0, x2 = 0, x3 = 0, s1, s2, s3, a1, a2, a3, suma, A1, A2, A3, X1 = 0, X2 = 0, X3 = 0, AT = 0, ST = 0, SDT = 0;
    AT = data.artisti.length;
    for (i = 0; i < data.artisti.length; i++) {
      suma = 0;
      SDT += data.artisti[i].piese.length;
      for (j = 0; j < data.artisti[i].piese.length; j++) {
        ST += data.artisti[i].ascultari[j];
        suma += data.artisti[i].ascultari[j];
        if (data.artisti[i].ascultari[j] > x3) {
          x1 = x2; a1 = a2; s1 = s2;
          x2 = x3; a2 = a3; s2 = s3;
          x3 = data.artisti[i].ascultari[j];
          s3 = data.artisti[i].piese[j];
          a3 = data.artisti[i].formatie;
        }
        else if (data.artisti[i].ascultari[j] > x2) {
          x1 = x2; a1 = a2; s1 = s2;
          x2 = data.artisti[i].ascultari[j];
          s2 = data.artisti[i].piese[j];
          a2 = data.artisti[i].formatie;
        }
        else if (data.artisti[i].ascultari[j] > x1) {
          x1 = data.artisti[i].ascultari[j];
          s1 = data.artisti[i].piese[j];
          a1 = data.artisti[i].formatie;
        }
      }
      if (suma > X3) {
        X1 = X2; X2 = X3; X3 = suma;
        A1 = A2; A2 = A3; A3 = data.artisti[i].formatie;
      }
      else if (suma > X2) {
        X1 = X2; X2 = suma;
        A1 = A2; A2 = data.artisti[i].formatie;
      }
      else if (suma > X1) {
        X1 = suma;
        A1 = data.artisti[i].formatie;
      }
    }

    const { MessageEmbed } = require('discord.js');
    const link_spotify = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png`;

    const embed = new MessageEmbed()
      .setColor('#7d43d9')
      .setTitle("Taryn's Spotify Wrap")
      .setFooter({ text: 'Since 16th June 2022', iconURL: link_spotify })
      .setThumbnail(link_spotify)
      .addFields(
        { name: `**Aristi ascultati**`, value: `${AT}`, inline: true },
        { name: `**Piese diferite**`, value: `${SDT}`, inline: true },
        { name: `**Total piese ascultate**`, value: `${ST}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '__**Top 3 Artists**__', value: '\u200B' },
        { name: `${A3}`, value: `(${X3} ascultari)`, inline: true },
        { name: `${A2}`, value: `(${X2} ascultari)`, inline: true },
        { name: `${A1}`, value: `(${X1} ascultari)`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '__**Top 3 Songs**__', value: '\u200B' },
        { name: `${s3}`, value: `de ${a3} (${x3} ascultari)`, inline: true },
        { name: `${s2}`, value: `de ${a2} (${x2} ascultari)`, inline: true },
        { name: `${s1}`, value: `de ${a1} (${x1} ascultari)`, inline: true },
        { name: '\u200B', value: '\u200B' },

      )
    message.channel.send({ embeds: [embed] });

  }
  else if ((message.author.id == "238718268049719296" || message.author.id == "844090524066512897") && message.content.startsWith("!genres"))
  {
    var i, j, nr;
    let genres = JSON.parse(fs.readFileSync('genres.json'))
    const link_spotify = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png`;
    let msg = message.content.split(" ")
    if (msg[1] != undefined && msg[1] <= 25) nr = msg[1];
    else nr = 10; 
    const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    .setColor('#7d43d9')
    .setTitle(`Taryn's Spotify Wrap`)
    .setDescription(`***Au fost ascultate ${genres.genuri.length} de genuri muzicale diferite***`)
    .setThumbnail(link_spotify)
    .setFooter({ text: 'Since 16th June 2022', iconURL: link_spotify })

    const listsorted = genres.genuri.sort((a, b) => b.ascultari - a.ascultari)
    //console.log (listsorted);
    for (i=1; i<=nr; i++)
    {
      embed.addField(`${listsorted[i-1].nume} (${listsorted[i-1].ascultari} ascultari)`, `${listsorted[i-1].artist[0]}, ${listsorted[i-1].artist[1]}, ${listsorted[i-1].artist[2]}`, true)
    }
    message.channel.send({ embeds: [embed] });
  }
  else if ((message.author.id == "238718268049719296" || message.author.id == "844090524066512897") && message.content == "!random")
  {
    let genres = JSON.parse(fs.readFileSync('genres.json'))
    let gen_curent = genres.genuri[Math.floor(Math.random() * genres.genuri.length)]
    lista_artisti = gen_curent.artist.toString().split(',').join(', ')
    const link_spotify = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/2048px-Spotify_App_Logo.svg.png`;
    const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    .setColor('#7d43d9')
    .setTitle(`Taryn's Spotify Wrap`)
    .setThumbnail(link_spotify)
    .setFooter({ text: 'Since 16th June 2022', iconURL: link_spotify })

    embed.addField(`${gen_curent.nume} (${gen_curent.ascultari} ascultari)`, lista_artisti)
    message.channel.send({ embeds: [embed] });

  }
  else if ((message.author.id == "238718268049719296" || message.author.id == "844090524066512897") && message.content == "!help")
  {
    const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    .setColor('#7d43d9')
    .setTitle(`Comenzile mele`)
    .addField('!stats', 'Informatii generale despre activitatea ta pe spotify')
    .addField('!genres <0-25>', 'Top-ul celor mai ascultate genuri muzicale. Daca nu este precizat un argument, se afiseaza top-ul primelor 10 genuri muzicale')
    .addField('!random', 'Se afiseaza un gen muzical la intamplare si se afiseaza toti artistii respectivului gen muzical')

    message.channel.send({embeds: [embed]});
  }

} catch (er) { console.log (er); fs.appendFile('logs.txt', er + '\n', plm => { if (plm) return }) }
});



client.login(token);
