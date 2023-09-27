import getInitials from '.';

describe('get initials', () => {
  it('should get initials - Max 2', () => {
    expect(getInitials('Guilda Dev')).toEqual('GD');
  });

  it('should get initials - just one', () => {
    expect(getInitials('Guilda')).toEqual('G');
  });


  it('Handle with errors', () => {
    expect(getInitials(null)).toEqual('');
    expect(getInitials(undefined)).toEqual('');
  });

  it('Handle with errors passing default value', () => {
    expect(getInitials(null, 'G')).toEqual('G');
    expect(getInitials(undefined, 'G')).toEqual('G');
  });
});
