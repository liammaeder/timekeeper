<script>
    import Nav from '$lib/navbar.svelte';

    let id = 1;

    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let  paramObject = new URLSearchParams(paramString);
    for (let pair of paramObject.entries()) {
        if (pair[0] === "id") {
            id = pair[1];
        }
    }

    id--;

    let races = [
        {
            id: 1,
            status: "complete",
            name: 'Splash & Dash',
            date: '11-01-2024',
            participants: [
                {
                    id: 1,
                    type: 'k2',
                    time: '00:45:02',
                    racers: [
                        {
                            id: 1,
                            name: 'John Doe'
                        },
                        {
                            id: 2,
                            name: 'Jane Doe'
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'k1',
                    time: '00:52:32',
                    racers: [
                        {
                            id: 3,
                            name: 'Max Henry'
                        },
                    ]
                }
            ]
        },
        {
            id: 2,
            status: "complete",
            name: 'SSS',
            date: '11-01-2024',
            participants:[
                {
                    id: 1,
                    type: 'k2',
                    time: '01:16:10',
                    racers: [
                        {
                            id: 1,
                            name: 'Sam Smith'
                        },
                        {
                            id: 2,
                            name: 'Katie Jane'
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'k1',
                    time: '01:02:32',
                    racers: [
                        {
                            id: 3,
                            name: 'Mark Paul'
                        },
                    ]
                }
            ]
        },
        {
            id: 3,
            status: "complete",
            name: 'Splash & Dash',
            date: '04-01-2024',
            participants: [
                {
                    id: 1,
                    type: 'k2',
                    time: '00:48:02',
                    racers: [
                        {
                            id: 1,
                            name: 'John Doe'
                        },
                        {
                            id: 2,
                            name: 'Jane Doe'
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'k1',
                    time: '00:51:05',
                    racers: [
                        {
                            id: 3,
                            name: 'Max Henry'
                        },
                    ]
                }
            ]
        },
        {
            id: 4,
            status: "complete",
            name: 'SSS',
            date: '04-01-2024',
            participants: [
                {
                    id: 1,
                    type: 'k2',
                    time: '00:56:02',
                    racers: [
                        {
                            id: 1,
                            name: 'Sam Smith'
                        },
                        {
                            id: 2,
                            name: 'Katie Jane'
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'k1',
                    time: '01:03:05',
                    racers: [
                        {
                            id: 3,
                            name: 'Mark Paul'
                        },
                    ]
                }
            ]
        },
        {
            id: 5,
            status: "in-progress",
            name: 'SSS',
            date: '04-01-2024',
            participants: [
                {
                    id: 1,
                    type: 'k2',
                    time: '00:56:02',
                    racers: [
                        {
                            id: 1,
                            name: 'Sam Smith'
                        },
                        {
                            id: 2,
                            name: 'Katie Jane'
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'k1',
                    time: '01:03:05',
                    racers: [
                        {
                            id: 3,
                            name: 'Mark Paul'
                        },
                    ]
                }
            ]}
    ];

    let raceDetails = races[id];
    console.log(raceDetails);
</script>

<body data-theme="dark" class="h-screen justify-center">
    <Nav pageName="Race"/>
    <div class="w-full h-fit p-3 mt-[75px]">
        <div class="text-center text-primary">
            {raceDetails.name} - {raceDetails.date}
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Boat Type</th>
                    <th>Racers</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {#each raceDetails.participants as participants (participants.id)}
                    <tr>
                        <th>{participants.id}</th>
                        <td>
                            {participants.type}
                        </td>
                        <td>
                            <ol>
                                {#each participants.racers as racer}
                                    <li>{racer.name}</li>
                                {/each}
                            </ol>
                        </td>
                        <td>
                            {participants.time}
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</body>