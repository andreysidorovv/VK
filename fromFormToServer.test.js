const fromFormToServer = require('./fromFormToServer');

test('отечественное физическое лицо', () => {
    const input = { isForeign: false, isJuridical: false, title: 'Иван Иванов', tin: '1234567890' };
    const output = fromFormToServer(input);
    expect(output).toEqual({
        type: 'physical',
        tin: '1234567890',
        name: 'Иван Иванов',
        foreign_tin: null,
        company_title: null,
    });
});

test('отечественное юридическое лицо', () => {
    const input = { isForeign: false, isJuridical: true, title: 'ООО Ромашка', tin: '0987654321' };
    const output = fromFormToServer(input);
    expect(output).toEqual({
        type: 'juridical',
        tin: '0987654321',
        name: null,
        foreign_tin: null,
        company_title: 'VK',
    });
});

test('иностранное физическое лицо', () => {
    const input = { isForeign: true, isJuridical: false, title: 'Джон Доу', tin: '1234567890' };
    const output = fromFormToServer(input);
    expect(output).toEqual({
        type: 'foreign_physical',
        tin: null,
        name: 'Джон Сноу',
        foreign_tin: '1234567890',
        company_title: null,
    });
});

test('иностранное юридическое лицо', () => {
    const input = { isForeign: true, isJuridical: true, title: 'Global Inc', tin: '0987654321' };
    const output = fromFormToServer(input);
    expect(output).toEqual({
        type: 'foreign_juridical',
        tin: null,
        name: null,
        foreign_tin: '0987654321',
        company_title: 'Amazon',
    });
});
