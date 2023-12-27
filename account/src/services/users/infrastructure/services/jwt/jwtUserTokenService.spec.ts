import { UserPayloadProps } from '@services/users/domain/services/userTokenService';
import { JwtUserTokenService } from '@services/users/infrastructure/services/jwt/jwtUserTokenService';

const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA1aTG2yySNEnrGDMV9G270hWCGdOqkgovwcxFS1djLkpmqSDH
I9uA35zGH0vTN5RCQ4giT5HfR8W/r2O8yVCTjsy2Tfi9bUq2aHlal7J5LoW3C1vO
3+I+fMNlpKA52wGSaxu44tuMEK9CY1OiC7NOj09pVh7CXme09uCXS0+tMie9JOis
wixx6wVSCrDiOon1gpQvyrqjWGbwlDy8sxXiuj5w2ep4E/gZsBDij5Tu+ENBdwGd
oG0MeMJHfy+khsu098dyRkLTPYyIvvYzuUDWq6nlkBe4+IdhTs+E6nchpKkTeFRZ
fqLqWUN0E772VvCMs1ApDKXPzxO9n2Rqw9TNSwIDAQABAoIBAQDFhti4sefnYmRz
dmAZIw/heDNWj6YH6lUnWCbFNuGjXfS28HBOTddEZ92h9+gsXe46I/adHOCUqlfE
4HEerFoRUGJJiu4Qy2AFDhZdZQy3n7eST+rggnyFu98RK3bybuyiDPqO/K/uiSvX
S+7p5HmA9MoObtgEktv02cfoQJ2AXR7PbglGNdGvx9fszspC2mswL52thZOzWGR/
5gZsUM/4py6WdsdPzY+v2gq5LjxNqJE9/zKbRxfACKQfYu2jYy+EARZyAd6PtHGF
FYDb3y9HgDky+mB+gay2Pn3vZC2AKlZCATlmcjfTc2NEe7sz0SgP5eZg8ToPQbpI
iwesE1C5AoGBAPFl4kVhxKsavBM8lEIlEfD/Xhpbo7+QP5/ovuFlhUAxCHOQ/vDD
w+4ysG2BodOM8ZPJXUzkmq/fc5upMG9iHp/cHi17ksCmLj4m/ihLsfmtQ96dKrap
oCA0ZlBLvpXFg70uEzcqgmdZFQY5wyKow0msuUrkAPQzWA87kdZgw6APAoGBAOKR
G/15U+Ya4P81gl6MblRpV8yQ+waKX1APbf62+bp0mM8cvz53BdZiuRSsxcwQK9/V
g8OceE2r9WkwFrPESAKk9sopz3CvociLX9aYB+kYYBnSHNu9T+zwZt07gb/vDJGg
oommc3Q6Q7g5H9zKi6nqLU2TFXS3kEJwJ10+NYMFAoGAJYL3jmCK9yvIXhTj1QN9
rj2AmgfzgikgOfEo+E2WT0tPTOYTN8a0A6fM0rd6Ni2IvLZl0TUU9I98n4vDAwv0
RlMmPVseiuFH/lCA3jIlDe9mxIkXwhrJzzdVTtT2YL+4oQUv5zqr2PN22OjQ8enX
rvMwN/sGSuxPms5e8zlGLPECgYEAqwoHCmTEnKrf/moj4EK9q8XW/VzZ1MczSxpK
3Ia/oi4RihFWos5xvrXKqTwBGpt+s7zZexutil1tqBogmVdtUWm90UKdEqHUTbRC
BpvBJQw8yGFhXdXd965IyWz59658W5fb/HSHJlAx/WpKjoDtzLk3uB94jCNjqXRH
k1G6Tg0CgYEAkgUy/AE4ujEzCb5SJTnx89nBYH8CU7V/PahKkOTihzvevYiGGivZ
HQy+po3IgGrssHgrzIl8f7RkRKZHfzA+bjMLC4bftKNFEPMA+NUxC7bK7PB3B7bH
EqSbnP3MPSI35gNOQOqMTdUHla4lZLEL4KK0GG3hXrobu9OLgnCO7qo=
-----END RSA PRIVATE KEY-----`;

const CURRENT_DATE = new Date();

const PAYLOAD: UserPayloadProps = {
  userId: '12345',
  email: 'soymichel.dev@gmail.com',
  username: 'SoymichelDev',
  phone: '8888-8888',
  createdAt: CURRENT_DATE.toISOString(),
  updatedAt: CURRENT_DATE.toISOString(),
};

describe('Tests JwtUserTokenService', () => {
  test('Testing encode', async () => {
    const jwtService = new JwtUserTokenService({ privateKey: PRIVATE_KEY });
    const token = await jwtService.encode(PAYLOAD);
    expect(token).toBeDefined();
  });

  test('Testing decode', async () => {
    const jwtService = new JwtUserTokenService({ privateKey: PRIVATE_KEY });
    const token = await jwtService.encode(PAYLOAD);
    const payloadFromTokenDecoded = await jwtService.verifyAndDecode(token);
    expect(payloadFromTokenDecoded).toEqual(PAYLOAD);
  });
});
